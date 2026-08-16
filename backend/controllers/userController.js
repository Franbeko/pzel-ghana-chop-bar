import userModel from "../modals/userModal.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY)
}

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
}

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
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: false
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" });
    }
}

// TEMPORARY - Only for testing (remove before deployment)
const createAdmin = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Admin@123", salt);
        
        const adminExists = await userModel.findOne({ email: "admin@pzeleats.com" });
        if (adminExists) {
            return res.json({ success: false, message: "Admin already exists" });
        }
        
        const admin = new userModel({
            username: "pzel_admin",
            email: "admin@pzeleats.com",
            password: hashedPassword,
            isAdmin: true
        });
        
        await admin.save();
        res.json({ success: true, message: "Admin created! Login with: admin@pzeleats.com / Admin@123" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ONLY ONE EXPORT STATEMENT - make sure there's only one of these
export { loginUser, registerUser, createAdmin };