const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes.js");
const connectDB = require("./models/db.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => {
    res.json({ message: "Server is working" });
});

module.exports = app;