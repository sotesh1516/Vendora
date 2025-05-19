const mongoose = require("mongoose");
const dotenv= require("dotenv");

dotenv.config();

async function connectDB() {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI, {

        });
        
        console.log("Database has been successfully connected");

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

