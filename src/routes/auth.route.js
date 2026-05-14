import express from "express";

import {
  register,
  getAllUsers,
  refreshToken,
  logoutUser,
  loginUser,
} from "../controllers/authController.js";
import { validate } from "../middlewares/Validate.js";
import {
  RegisterValidation,
  LoginValidation,
} from "../validation/UserValidation.js";
import { loginLimiter } from "../utils/rate-limit.js";
const router = express.Router();

router.post("/register", validate(RegisterValidation), register);
router.post("/login", validate(LoginValidation), loginLimiter, loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.get("/users", getAllUsers);

export default router;
