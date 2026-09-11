import userModel from "../modals/userModal.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Token now expires in 7 days
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
};

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user;

        if (email) {
            user = await userModel.findOne({ email });
        }

        if (!user && username) {
            user = await userModel.findOne({ username });
        }

        if (!user && req.body.username && req.body.username.includes('@')) {
            user = await userModel.findOne({ email: req.body.username });
        }

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }

        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            isAdmin: user.isAdmin || false,
            user: { id: user._id, username: user.username, email: user.email }
        });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" });
    }
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        const usernameExists = await userModel.findOne({ username });
        if (usernameExists) {
            return res.json({ success: false, message: "Username Already Taken" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Strong Password (min 8 characters)" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            isAdmin: false   // ✅ Always false for public signups
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            isAdmin: false,
            user: { id: user._id, username: user.username, email: user.email }
        });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" });
    }
};

// createAdmin has been REMOVED — admin creation now happens via scripts/seedAdmin.js

export { loginUser, registerUser };