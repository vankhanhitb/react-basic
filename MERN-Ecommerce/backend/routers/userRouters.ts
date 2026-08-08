import express from "express";
import { 
  createUser, 
  loginUser, 
  logoutUser, 
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUser,
} from "../controllers/userController";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUser)

export default router;