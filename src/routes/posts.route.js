import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import upload from "../utils/multer.js";
import { ValidatedID } from "../middlewares/validateID.js";
import { validate } from "../middlewares/Validate.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";
import {
  CreatePostValidation,
  UpdatePostValidation,
} from "../validations/post.validation.js";

const router = express.Router();


router.get("/", getAllPosts);
router.get("/:id", ValidatedID, getPostById);


router.post(
  "/",
  VerifyToken,
  upload.single("Image"),
  validate(CreatePostValidation),
  createPost
);

router.put(
  "/:id",
  VerifyToken,
  ValidatedID,
  upload.single("Image"),
  validate(UpdatePostValidation),
  updatePost
);

router.delete(
  "/:id",
  VerifyToken,
  ValidatedID,
  deletePost
);

export default router;