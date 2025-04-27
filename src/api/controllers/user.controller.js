const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
    try {
        const {name, email, password, confirmPassword, platforms, deviceInfo} = req.body;
        const commonEmailProviders = /@(gmail|yahoo|hotmail|outlook|icloud|yandex|protonmail|proton|tutanota|zoho|mail\.ru|yahoo\.(co\.uk|com\.tr|com)|hotmail\.(co\.uk|com\.tr|com))$/i;
        const confirmPasswordError = password !== confirmPassword;
        if (confirmPasswordError || commonEmailProviders.test(email)) return res.status(408).json({message: "Passwords do not match"});
        const userExists = await User.findOne({email});
        if (userExists) return res.status(409).json({message: "Email already registered"});
        if (name.length < 3 || name.length > 100) return res.status(407).json({message: "Name must be between 3 and 100 characters"});

        const newUser = new User({name, email, password, platforms, deviceInfo});
        await newUser.save();

        res.status(200).json({message: "User created", user: newUser});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
