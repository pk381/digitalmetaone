const express = require("express");

const {
  createWithdrawalRequest,
  getAllWithdrawals,
  getUserWiseWithdrawals,
  markWithdrawalComplete,
  getTotalWithdrawals,
} = require("../controllers/paymentController");

const router = express.Router();

router.get("/withdrawals", getAllWithdrawals);

router.get("/withdrawals/company-withdrawals", getTotalWithdrawals);

router.get("/withdrawals/:id", getUserWiseWithdrawals);

router.post("/withdrawals", createWithdrawalRequest);

router.put("/withdrawals/mark-complete/:id", markWithdrawalComplete);

module.exports = router;
