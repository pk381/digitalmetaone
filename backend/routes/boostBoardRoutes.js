const express = require("express");

const {
  joinBoostBoard,
  getBoostBoardEntries,
  rewardBoostBoardAmount,
} = require("../controllers/boostBoardController");

const router = express.Router();

router.post("/join-boost-board", joinBoostBoard);

router.post("/reward-income", rewardBoostBoardAmount);

router.get("/", getBoostBoardEntries);

module.exports = router;
