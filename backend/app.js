const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes.js");
const connectDB = require("./models/db.js");

const app = express()

connectDB();

app.use(cors());
app.use(express.json())
app.use('/api/auth', authRoutes)