import type { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from "../middlewares/asyncHandler";

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

    const newUsers = new User({username, email, password});

    try {
      await newUsers.save();

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


export { createUser };