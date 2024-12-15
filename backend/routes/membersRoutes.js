const express = require("express");

const { getMembersData , getMyTeamMembersData } = require("../controllers/membersController");

const router = express.Router();

router.get("/", getMembersData);

router.get("/:id", getMyTeamMembersData);

module.exports = router;
