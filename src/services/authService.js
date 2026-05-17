import { User } from "../models/User.js";
import { generateTokens, setRefreshCookie } from "../utils/Token.js";
import jwt from "jsonwebtoken";

// register
export const registerService = async ({ Name, Email, Password }) => {
  const existingUser = await User.findOne({ Email });
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.create({ Name, Email, Password });

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    user: { id: user._id, Name: user.Name, Email: user.Email },
    accessToken,
    refreshToken,
  };
};

//  Login
export const loginService = async ({ Email, Password }) => {
  const user = await User.findOne({ Email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
  const isMatch = await user.comparePassword(Password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    user: { id: user._id, Name: user.Name, Email: user.Email },
    accessToken,
    refreshToken,
  };
};

//    refresh-token
export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("No refresh token provided");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const { accessToken } = generateTokens(user);
  return { accessToken };
};

//   get-all-user
export const getAllUsersService = async () => {
  const users = await User.find().select("-Password");
  return users;
};
