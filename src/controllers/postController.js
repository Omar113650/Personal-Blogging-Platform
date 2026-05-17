import asyncHandler from "express-async-handler";
import {
  getAllPostsService,
  getPostByIdService,
  createPostService,
  updatePostService,
  deletePostService,
} from "../services/postService.js";
import {
  CreatePostValidation,
  UpdatePostValidation,
} from "../validation/PostsValidation.js";

// @desc   Get all posts
// @route  GET /api/posts
// @access Public
export const getAllPosts = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllPostsService({ page, limit });

  res.status(200).json({
    success: true,
    ...result,
  });
});

// @desc   Get single post
// @route  GET /api/posts/:id
// @access Public
export const getPostById = asyncHandler(async (req, res) => {
  const post = await getPostByIdService(req.params.id);

  res.status(200).json({ success: true, post });
});

// @desc   Create post
// @route  POST /api/posts
// @access Private
export const createPost = asyncHandler(async (req, res) => {
  const { error } = CreatePostValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { Title, Content } = req.body;
  const post = await createPostService({
    Title,
    Content,
    file: req.file,
    userId: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

// @desc   Update post
// @route  PUT /api/posts/:id
// @access Private (Owner only)
export const updatePost = asyncHandler(async (req, res) => {
  const { error } = UpdatePostValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { Title, Content } = req.body;
  const post = await updatePostService({
    id: req.params.id,
    Title,
    Content,
    file: req.file,
     userId: req.user.id,
  });

  res.status(200).json({
    message: "Post updated successfully",
    post,
  });
});

// @desc   Delete post
// @route  DELETE /api/posts/:id
// @access Private (Owner only)
export const deletePost = asyncHandler(async (req, res) => {
  const { deletedId } = await deletePostService({
    id: req.params.id,
     userId: req.user.id,
  });

  res.status(200).json({
    message: "Post deleted successfully",
    deletedId,

  });
});
