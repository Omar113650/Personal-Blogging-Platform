import asyncHandler from "express-async-handler";
import rateLimit from "express-rate-limit";
import { setRefreshCookie } from "../utils/Token.js";
import {
  registerService,
  loginService,
  refreshTokenService,
  getAllUsersService,
} from "../services/authService.js";

// @desc   register
// @route  POST /api/V1/register
export const register = asyncHandler(async (req, res) => {
  const { Name, Email, Password } = req.body;

  const { user, accessToken, refreshToken } = await registerService({
    Name,
    Email,
    Password,
  });

  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    message: "Registration successful",
    user,
    accessToken,
    refreshToken
  });
});

// @desc   Login
// @route  POST /api/V1/login
export const loginUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  const { user, accessToken, refreshToken } = await loginService({
    Email,
    Password,
  });

  setRefreshCookie(res, refreshToken);

  res.status(200).json({
    message: "Login successful",
    user,
    accessToken,
    refreshToken
  });
});

// @desc   Logout
// @route  POST /api/V1/Logout
export const logoutUser = asyncHandler(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.clearCookie("AccessToken", cookieOptions);
  res.clearCookie("RefreshToken", cookieOptions);

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc   refresh-token
// @route  POST /api/V1/refresh
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.RefreshToken || req.body?.refreshToken;

  const { accessToken } = await refreshTokenService(token);

  res.cookie("AccessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken,
  });
});

// @desc  get-all-user
// @route  GET /api/V1/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});
