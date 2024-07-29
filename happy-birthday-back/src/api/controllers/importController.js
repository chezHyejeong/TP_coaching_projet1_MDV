const multer = require("multer");
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const pool = require("../../config/db");

const upload = multer({ dest: "uploads/" });

function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

exports.importStudents = [
  upload.single("file"),
  (req, res) => {
    const filePath = path.resolve(
      __dirname,
      "../../uploads",
      req.file.filename
    );
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({ delimiter: ";", columns: true, bom: true }));

    parser.on("data", async (row) => {
      try {
        const formattedDate = formatDate(row.birthday);
        await pool.query(
          "INSERT INTO students (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",
          [formattedDate, row.lastname, row.firstname, row.email]
        );
      } catch (err) {
        console.error("Error inserting student:", err);
      }
    });

    parser.on("end", () => {
      fs.unlinkSync(filePath);
      res.send("Students imported successfully");
    });

    parser.on("error", (error) => {
      res.status(500).send("Error processing file: " + error.message);
    });
  },
];

exports.importQuotes = [
  upload.single("file"),
  (req, res) => {
    const filePath = path.resolve(
      __dirname,
      "../../uploads",
      req.file.filename
    );
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({ delimiter: ";", columns: true, bom: true }));

    parser.on("data", async (row) => {
      try {
        await pool.query("INSERT INTO quotes (quote, author) VALUES (?, ?)", [
          row.quote,
          row.author,
        ]);
      } catch (err) {
        console.error("Error inserting quote:", err);
      }
    });

    parser.on("end", () => {
      fs.unlinkSync(filePath);
      res.send("Quotes imported successfully");
    });

    parser.on("error", (error) => {
      res.status(500).send("Error processing file: " + error.message);
    });
  },
];
