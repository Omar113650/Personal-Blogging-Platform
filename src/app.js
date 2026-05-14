import express from "express";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(express.json());
import authRoutes from "./routes/auth.route.js";

app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

app.get("/", (req, res) => res.send("Hello in Personal Blogging Platform "));

app.use("/api/v1/auth", authRoutes);

export default app;
