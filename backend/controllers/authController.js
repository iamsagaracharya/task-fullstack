const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");



// Generate JWT

const generateToken = (userId) => {

    return jwt.sign(
        {
            userId: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );

};


// SIGNUP
// POST /api/auth/signup

const signup = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Validation

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });

        }


        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters"
            });

        }


        // Check existing user

        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });

        }


        // Hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        // Generate JWT

        const token = generateToken(user._id);


        // Response

        res.status(201).json({

            success: true,

            message: "Account created successfully",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.error("Signup error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during signup"
        });

    }

};


// LOGIN
// POST /api/auth/login

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Validation

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }


        // Find user

        const user = await User.findOne({
            email
        });


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // Compare password

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatches) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // Generate JWT

        const token = generateToken(user._id);


        // Response

        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });

    }

};


module.exports = {
    signup,
    login
};