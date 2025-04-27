const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    platforms: {
        type: Object,
        required: false,
    },
    deviceInfo: {
        type: Object,
        required: false,
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
