require('dotenv').config()

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://moadmin:chewychewy@cluster0.bnaep.mongodb.net/tvshows?retryWrites=true&w=majority');
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;