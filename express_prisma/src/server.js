// const express = require('express');
// const app = express();
// const PORT = 5555;

// ------------------------------------------------------

// console.log("This is TEST consolog");
// // Data Show For HTML

// app.get('/', (req, res) => {
//   console.log("This is get");
//   res.send("<h1>Hello Worl</h1>")
// })

// app.get('/dashboard', (req, res) => {
//   console.log("This is DASHBOARD", req.method);
//   res.send("<h1>This is Dashboard</h1>");
// })

// // Router show data from database
// let data1 = {
//   username: "Tester-1",
//   email: "tester1@gmial.com",
//   password: "123456789",
//   isAdmin: false
// }
// app.get('/api/data', (req, res) => {
//   console.log("Send data from database");
//   res.send(data1);
// })

// //Middleware
// app.use(express.json());

// app.patch('/api/data', (req, res) => {
//   const { username } = req.body;

//   if (typeof username !== "string" || !username.trim()) {
//     return res.status(400).json({
//       message: "Username is required",
//     });
//   }

//   data1.username = username.trim();

//   return res.status(200).json(data1);
// });

// ------------------------------------------------------

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import authRouters from "./routers/authRouters.js";
import todoRouters from "./routers/todoRouters.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(express.json());

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//Get the directory name from the file path
const __dirname = dirname(__filename);

// Server the Html file from the /public directory
// Tells express to serve all files from the public folder as static assets //file. Any request for the css files will be resolves to the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// authRouter
app.use("/auth", authRouters);

// todoRouter
app.use("/todos", authMiddleware, todoRouters);

app.listen(PORT, () => console.log(`Server ready on PORT ${PORT}`)); 