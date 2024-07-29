const express = require("express");
const importController = require("../controllers/importController");

const router = express.Router();

router.post("/importStudents", importController.importStudents);
router.post("/importQuotes", importController.importQuotes);

module.exports = router;
