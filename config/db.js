import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectDB = async () => {
    try {
        // console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected");
    } catch (error) {
        console.log("Error",error);
    }
}


export default connectDB;


