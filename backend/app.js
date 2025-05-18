import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"

const express = require('express')
const app = express()

app.use(cors());
app.use(express.json())
app.use('/api/auth', authRoutes)