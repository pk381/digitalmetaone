const express = require("express");

const {
  login,
  register,
  changePassword,
  changePasswordAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/sign-up", register);

router.post("/login", login);

router.post("/change-password", changePassword);

router.post("/change-password/admin", changePasswordAdmin);

module.exports = router;
