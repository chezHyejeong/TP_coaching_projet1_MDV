const pool = require("../../config/db");
const { importQuotes } = require("./importController");

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

exports.uploadAndImportQuotes = importQuotes;
