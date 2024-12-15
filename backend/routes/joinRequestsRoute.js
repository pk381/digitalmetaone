const express = require("express");

const {
  acceptJoiningRequest,
  addJoiningRequests,
  getJoiningRequests,
  declineJoiningRequest,
} = require("../controllers/joinRequestsController");

const router = express.Router();

router.get("/", getJoiningRequests);

router.post("/", addJoiningRequests);

router.put("/:id", acceptJoiningRequest);

router.put("/decline-request/:id", declineJoiningRequest);


module.exports = router;
