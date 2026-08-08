import User from "../models/userModel";
import asyncHandler from "../middlewares/asyncHandler";

const createUser = asyncHandler(async (req, res) => {
  res.send("Hello");
})

export default createUser;