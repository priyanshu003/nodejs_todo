import express from "express";
import {
  getAllUsers,
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../Controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", registerUser);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/all", getAllUsers);

//dynamic url
router.route("/me").get(isAuthenticated, getMyProfile);

export default router;
