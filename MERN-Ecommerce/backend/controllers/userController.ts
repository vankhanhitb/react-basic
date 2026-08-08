import type { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from "../middlewares/asyncHandler";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken";

// CREATE USER
type CreateUserBody = {
  username: string;
  email: string;
  password: string;
};


const createUser = asyncHandler(
  async (
    req: Request<Record<string, never>, unknown, CreateUserBody>,
    res: Response,
  ): Promise<void> => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
      throw new Error("Please fill all the inputs.")
    }

    const userExists = await User.findOne({email});
    if(userExists) {
      res.status(400).json({ message: "User already exists" })
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUsers = new User({username, email, password: hashedPassword});

    try {
      await newUsers.save();
      createToken(res, newUsers._id.toString());

      res.status(201).json({
        _id: newUsers._id,
        username: newUsers.username,
        email: newUsers.email,
        isAdmin: newUsers.isAdmin
      });
      
    } catch (error) {
      res.status(400);
      throw new Error("Invalid user data");
    }

  },
);

// LOGIN USER
type LoginUserBody = {
  email: string;
  password: string;
};

const loginUser = asyncHandler<
  Record<string, never>,
  unknown,
  LoginUserBody
  >(async(req, res): Promise<void> => {
    const {email, password} = req.body;

    if(
      typeof email !== "string"
      ||
      typeof password !== "string"
      ||
      !email.trim()
      ||
      !password
    ) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    const normalizeEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizeEmail,
    });

    if(!existingUser) {
      res.status(401).json({
        message: "Invalid email or password",
      })
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordValid) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    createToken(res, existingUser._id.toString());

    res.status(201).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin
    });
})

// LOGOUT USER

const logoutUser = asyncHandler(
  async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({message: "Logout successfully!"})
  }
);

const getAllUsers = asyncHandler(
  async (_req, res): Promise<void> => {
    const users = await User.find({}).select("-password");

    res.status(200).json(users);
  },
);


export { createUser, loginUser, logoutUser, getAllUsers };
