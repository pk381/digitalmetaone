const express = require("express");

const {
  addContactQuery,
  getContactQUeries,
} = require("../controllers/contactUsController");

const router = express.Router();

router.get("/", getContactQUeries);

router.post("/", addContactQuery);

module.exports = router;
