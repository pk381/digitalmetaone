const express = require("express");

const { getTree } = require("../controllers/treeController");

const router = express.Router();

router.get("/:id", getTree);

module.exports = router;
