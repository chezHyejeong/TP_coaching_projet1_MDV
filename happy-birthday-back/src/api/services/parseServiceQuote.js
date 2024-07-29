const fs = require("fs");
const { parse } = require("csv-parse");
const pool = require("../../config/db");

exports.parseFile = (filename) => {
  return new Promise((resolve, reject) => {
    let results = [];

    fs.createReadStream(`./data/${filename}`)
      .pipe(
        parse({
          delimiter: ";",
          columns: true,
          bom: true,
        })
      )
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        const query = "INSERT INTO quotes (quote, author) VALUES ?";
        const values = results.map((row) => [row.quote, row.author]);

        pool.query(query, [values], (err) => {
          if (err) {
            return reject(err);
          }
          resolve("CSV file successfully imported");
        });
      })
      .on("error", (error) => {
        reject(error.message);
      });
  });
};
