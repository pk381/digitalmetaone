const express = require("express");

const {
  getUploadSignedUrl,
  getViewSignedUrl,
} = require("../controllers/uploadFileController");

const router = express.Router();

router.post("/get-file", getViewSignedUrl);

router.post("/upload-file", getUploadSignedUrl);

module.exports = router;
