const multer = require("multer");
const path = require("path");
const { importCSVToDatabase } = require("../services/parseServiceQuote");
const pool = require("../../config/db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

exports.uploadAndImportQuotes = [
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const filename = req.file.filename;
      await importCSVToDatabase(filename);
      res.status(200).json({ message: "CSV file successfully imported" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.getRandomQuote = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM quotes ORDER BY RAND() LIMIT 1"
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("Error reading from database:", err);
    res.status(500).json({ error: "Database error" });
  }
};
