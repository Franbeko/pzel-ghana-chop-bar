import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from the backend root (this script is inside scripts/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import the user model
import userModel from '../modals/userModal.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

const main = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI is not set in backend/.env');
            process.exit(1);
        }

        console.log('\nConnecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected\n');

        console.log('=== Create Admin User ===\n');
        const username = (await ask('Username: ')).trim();
        const email = (await ask('Email: ')).trim().toLowerCase();
        const password = (await ask('Password (min 8 chars): ')).trim();

        if (!username || !email || !password) {
            console.error('All fields are required');
            process.exit(1);
        }
        if (password.length < 8) {
            console.error('Password must be at least 8 characters');
            process.exit(1);
        }

        const existing = await userModel.findOne({ email });
        if (existing) {
            console.error(`A user with email "${email}" already exists`);
            console.error('   If you want to promote them to admin, edit the DB directly.');
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await userModel.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        console.log('\nAdmin user created successfully!');
        console.log('   ID:       ', admin._id.toString());
        console.log('   Username: ', admin.username);
        console.log('   Email:    ', admin.email);
        console.log('   isAdmin:  ', admin.isAdmin);
        console.log('\nYou can now log in at the admin panel.\n');

        await mongoose.disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
    finally {
        rl.close();
    }
};

main();