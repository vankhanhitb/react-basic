import express from "express";
import { 
  createUser, 
  loginUser, 
  logoutUser, 
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(authenticate, getCurrentUserProfile).patch(authenticate, updateCurrentUser);

//ADMIN ROUTE
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById)
                    .get(authenticate, authorizeAdmin, getUserById)
                    .patch(authenticate, authorizeAdmin, updateUserById);

export default router;