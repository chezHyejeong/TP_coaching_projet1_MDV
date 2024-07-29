const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

exports.parseFile = (filename) => {
  let results = [];
  const filePath = path.resolve(__dirname, "../../data", filename);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        parse({
          delimiter: ";",
          columns: true,
          bom: true,
        })
      )
      .on("data", function (row) {
        results.push(row);
      })
      .on("end", function () {
        console.log(`Parsed data from ${filePath}:`, results);
        resolve(results);
      })
      .on("error", function (error) {
        reject(error.message);
      });
  });
};
