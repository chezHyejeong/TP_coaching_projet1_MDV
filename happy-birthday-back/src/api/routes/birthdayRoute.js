const express = require("express");
const birthdayController = require("../controllers/birthdayController");

const router = express.Router();

router.get("/getBirthday", birthdayController.getTodaysBirthday);

module.exports = router;
