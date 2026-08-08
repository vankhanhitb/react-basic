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

//
const getCurrentUserProfile = asyncHandler(
  async (req, res) => {
    const user = await User.findOne(req.user?._id);

    if(user){
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email
      })
    }else{
      res.status(404)
      throw new Error("User not exists");
    }

  }
);

type UpdateCurrentUserBody = {
  username?: string,
  email?: string,
  password?: string,
  isAdmin?: boolean,
}

type CurrentUserResponse = {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

type ErrorResponse = {
  message: string;
};

type UpdateCurrentUserResponse =
  | CurrentUserResponse
  | ErrorResponse;

const updateCurrentUser = asyncHandler<
Record<string, never>,
UpdateCurrentUserResponse,
UpdateCurrentUserBody
>(async (req, res): Promise<void> => {

  if(!req.user){
    res.status(401).json({
      message: "Not authorized"
    });
    return;
  }

  const user = await User.findById(req.user._id);

  if(!user){
    res.status(404).json({
      message: "User not found",
    })
    return;
  }

  const { username, email, password, isAdmin} = req.body;

  if(username !== undefined){
    const normallizeUsername = username.trim();
    
    if(!normallizeUsername) {
      res.status(400).json({
        message: "Username connot be empty",
      })
      return;
    }
    user.username = normallizeUsername;
  }

  if(email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();
    if(!normalizedEmail){
      res.status(400).json({
        message: "Email cannot be empty",
      })
      return;
    }

    const emailOwner = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: user._id},
    });

    if(emailOwner){
      res.status(409).json({
        message: "Email is already in use",
      });
      return;
    }

    user.email = normalizedEmail;
  }

  if(password !== undefined){
    if(password.length < 8){
      res.status(400).json({
        message: "Password must contain at least 8 characters",
      });
      return;
    }
    user.password = await bcrypt.hash(password, 10);
  }

  if(isAdmin !== undefined){
    user.isAdmin = isAdmin;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id.toString(),
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin
  });

});

export { 
  createUser, 
  loginUser, 
  logoutUser, 
  getAllUsers, 
  getCurrentUserProfile,
  updateCurrentUser,
};
