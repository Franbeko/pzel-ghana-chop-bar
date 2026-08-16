import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://franciskhhaizel_db_user:OInzmnAtGnXeWbj4@cluster0.j5nqkbc.mongodb.net/pzel_eats_db?retryWrites=true&w=majority')
    .then(() => console.log('DB CONNECTED'))
}