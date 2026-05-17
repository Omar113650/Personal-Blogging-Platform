import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const VerifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "You are not logged in to access this token",
    });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.log(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    return res.status(401).json({
      message: "Invalid token",
    });
  }
});