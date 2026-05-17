import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import statusMonitor from "express-status-monitor";
import { notfound, errorHandler } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      //  "https://blog-platform-kftk.vercel.app",
    ],

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan());
app.use(cookieParser());

app.use(statusMonitor());

app.use(express.json());
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/posts.route.js";

app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

app.get("/", (req, res) => res.send("Hello in Personal Blogging Platform "));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

app.use(notfound);
app.use(errorHandler);

export default app;
