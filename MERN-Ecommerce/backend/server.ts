import path from "path"
import dotenv from "dotenv/config";
import express from "express";
import cookieParse from "cookie-parser";

import { connectDB } from "../backend/config/db";

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.get("/", (_req, res) => {
  console.log(`Connect to MERN`);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))