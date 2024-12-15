const express = require("express");

const {
  getTotalInvestment,
  getTotalInvestmentInCurrentMonth,
} = require("../controllers/investmentController");

const router = express.Router();

router.get("/total-invesment", getTotalInvestment);

module.exports = router;
