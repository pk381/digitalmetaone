const express = require("express");

const {
  activateId,
  fetchEarnings,
  fetchUsersJoinedThisMonth,
  upgradePlan,
  searchUsers,
  updateUser,
  fetchInvestmentMadeUnderUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/joined-this-month", fetchUsersJoinedThisMonth);

router.get("/investment/:id", fetchInvestmentMadeUnderUser);

router.get("/:query", searchUsers);

router.get("/earnings/:id", fetchEarnings);

router.post("/upgrade-plan", upgradePlan);

router.post("/:id", activateId);

router.patch("/:id", updateUser);

module.exports = router;
