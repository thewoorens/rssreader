const User = require("../models/user.model");
const Hashes = require("jshashes");

exports.registerUser = async (req, res) => {
    try {
        const {name, email, password, confirmPassword, platforms, deviceInfo} = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({message: "All fields are required."});
        }

        if (password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match."});
        }

        if (name.length < 3 || name.length > 100) {
            return res.status(400).json({message: "Name must be between 3 and 100 characters."});
        }

        const disallowedProviders = /@(gmail|yahoo|hotmail|outlook|icloud|yandex|protonmail|proton|tutanota|zoho|mail\.ru|yahoo\.(co\.uk|com\.tr|com)|hotmail\.(co\.uk|com\.tr|com))$/i;
        if (disallowedProviders.test(email)) {
            return res.status(400).json({message: "Please use a business or private domain email address."});
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(409).json({message: "Email already registered."});
        }

        const hashedPassword = new Hashes.SHA256().b64(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            platforms,
            deviceInfo
        });

        await newUser.save();

        return res.status(200).json({
            message: "User registered successfully.",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({message: "Internal server error.", error: err.message});
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password, remember} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required."});
        }

        const user = await User.findOne({email}) || {
            password: undefined,
            platforms: undefined,
            email: undefined,
            name: undefined,
            _id: undefined
        }

        if (!user) {
            return res.status(401).json({message: "Invalid credentials."});
        }

        const hashedInputPassword = new Hashes.SHA256().b64(password);
        if (hashedInputPassword !== user.password) {
            return res.status(401).json({message: "Invalid credentials."});
        }
        let message = remember ? "Login successful. REMEMBER" : "Login successful. NO REMEMBER";
        return res.status(200).json({
            message,
            user: {
                name: user.name,
                email: user.email,
                platforms: user.platforms,
                userId: user._id,
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({message: "Internal server error.", error: err.message});
    }
};