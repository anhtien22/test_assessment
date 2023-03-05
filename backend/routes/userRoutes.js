const express = require('express');

const {
  login,
  registerUser,
  updateProfile,
  readProfile,
} = require('../controllers/userController.js');
const { auth } = require('../middleware/auth.js');

const router = express.Router()

router.route("/register").post(registerUser);

router.route("/login").post(login);

router.route("/profile").get(readProfile);

router.route("/profile/update").patch(auth, updateProfile);

module.exports = router;
