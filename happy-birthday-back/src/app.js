require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");
const pool = require("./config/db");

const hostname = "0.0.0.0";
const port = 3002;

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Importing routes
const birthdayRoute = require("./api/routes/birthdayRoute");
const importRoutes = require("./api/routes/importRoutes");
const quoteRoute = require("./api/routes/quoteRoute");

// Registering routes
server.use("/api", importRoutes);
server.use("/api", birthdayRoute);
server.use("/api", quoteRoute);

// Function to convert date format from DD/MM/YYYY to YYYY-MM-DD
function convertDateFormat(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

// Function to import CSV data into the database
async function importCSVData(filePath, query, columns, dateColumn = null) {
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: ";", columns: true, bom: true }));

  for await (const row of parser) {
    try {
      if (dateColumn) {
        row[dateColumn] = convertDateFormat(row[dateColumn]);
      }
      await pool.query(
        query,
        columns.map((col) => row[col])
      );
    } catch (err) {
      // Handle specific error for duplicate entry
      if (err.code === "ER_DUP_ENTRY") {
        console.log("Duplicate entry found, skipping insert.");
      } else {
        console.error("Error inserting data:", err);
      }
    }
  }
  console.log(`CSV data from ${filePath} imported successfully`);
}

// Import CSV data before starting the server
async function initializeDatabase() {
  await importCSVData(
    path.resolve(__dirname, "./data/students.csv"),
    "INSERT IGNORE INTO students (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",
    ["birthday", "lastname", "firstname", "email"],
    "birthday"
  );

  await importCSVData(
    path.resolve(__dirname, "./data/quotes.csv"),
    "INSERT IGNORE INTO quotes (quote, author) VALUES (?, ?)",
    ["quote", "author"]
  );

  server.listen(port, hostname, () => {
    console.log(`Serveur qui tourne sur le port ${port}`);
  });
}

initializeDatabase();
