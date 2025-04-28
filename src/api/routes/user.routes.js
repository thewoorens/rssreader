const express = require("express");
const router = express.Router();

const {registerUser, loginUser} = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const {registerValidation} = require("../validations/user.validation");

router.post("/register", validate(registerValidation), registerUser);
router.post("/login", loginUser);

module.exports = router;
