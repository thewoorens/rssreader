const express = require("express");
const router = express.Router();

const {registerUser} = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const {registerValidation} = require("../validations/user.validation");

router.post("/register", validate(registerValidation), registerUser);

module.exports = router;
