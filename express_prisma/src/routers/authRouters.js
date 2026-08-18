import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post('/register', (req, res) => {
  const {username, password} = req.body ?? {};

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: "A username and password of at least 8 characters are required",
    });
  }

  // Save the username ans an irreversibly encrypted password
  // Save email | bcript(password)
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Save the new user ans hashed password to the db
  try {
    const insertUser = db.prepare(`INSERT INTO users(username, password) VALUES (?, ?)`);
    const result = insertUser.run(username, hashedPassword);

    // Now that we have a user, I want to ass their first todo for them
    const defaultTodo = `helo :) Add your first todo!`;
    const insertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES (?, ?)`);
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // Create a token
    const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});

    return res.status(201).json({ token });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Registration failed",
    });
  }
})

router.post("/login", (req, res) => {
  // We get their email, and we look up the password associates with that email in the database
  // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying yo login
  // so what we can to do again, one way encrypt the password the user just enterd
  const { username, password } = req.body ?? {};

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: "A username and password of at least 8 characters are required",
    });
  }

  try {
    const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = getUser.get(username);

    //Check if user not found
    if(!user) {
      return res.status(404).send({messge:"User not found"});
    }

    const passwordIsvalid = bcrypt.compareSync(password, user.password);
    // If the password does not match, return out of the function
    if(!passwordIsvalid){
      return res.status(401).send({message: "Invalid password"});
    }

    // Then we have successful authentication
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return res.status(201).json({ token });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Loggin failed",
    });
  }
})

export default router;