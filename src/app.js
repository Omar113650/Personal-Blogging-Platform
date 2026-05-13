import express from "express";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

app.get("/", (req, res) => res.send("Hello in Personal Blogging Platform "));

export default app;
