import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN Ecommerce API is running",
  });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown startup error";

    console.error(`Server startup failed: ${message}`);
    process.exit(1);
  }
};

void startServer();