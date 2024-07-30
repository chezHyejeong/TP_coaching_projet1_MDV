const express = require("express");
const quoteController = require("../controllers/quoteController");

const router = express.Router();

router.post("/import", quoteController.uploadAndImportQuotes);
router.get("/randomquote", quoteController.getRandomQuote);

module.exports = router;
