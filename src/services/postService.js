import { Post } from "../models/Posts.js";
import {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} from "../utils/Cloudinary.js";

// Get All Posts
export const getAllPostsService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find()
      .populate("AuthorID", "Name Email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Post.countDocuments(),
  ]);

  return {
    posts,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

//  Get Post By Id
export const getPostByIdService = async (id) => {
  const post = await Post.findById(id).populate("AuthorID", "Name Email");
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }
  return post;
};

//  Create Post
export const createPostService = async ({ Title, Content, file, userId }) => {
  let Image = { url: "", publicId: null };

  if (file) {
    const uploaded = await cloudinaryUploadImage(file.buffer);
    if (!uploaded?.secure_url) {
      const error = new Error("Failed to upload image");
      error.statusCode = 500;
      throw error;
    }
    Image = { url: uploaded.secure_url, publicId: uploaded.public_id };
  }

  const post = await Post.create({
    Title,
    Content,
    Image,
    AuthorID: userId,
  });

  return post;
};

//  Update Post
export const updatePostService = async ({ id, Title, Content, file }) => {
  const post = await Post.findById(id);
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (post.AuthorID.toString() !== userId) {
    const error = new Error("Forbidden: not your post");
    error.statusCode = 403;
    throw error;
  }

  if (file) {
    if (post.Image?.publicId) {
      await cloudinaryRemoveImage(post.Image.publicId);
    }
    const uploaded = await cloudinaryUploadImage(file.buffer);
    if (!uploaded?.secure_url) {
      const error = new Error("Failed to upload image");
      error.statusCode = 500;
      throw error;
    }
    post.Image = { url: uploaded.secure_url, publicId: uploaded.public_id };
  }

  if (Title) post.Title = Title;
  if (Content) post.Content = Content;

  await post.save();
  return post;
};

//  Delete Post
export const deletePostService = async ({ id }) => {
  const post = await Post.findById(id);
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (post.AuthorID.toString() !== userId) {
    const error = new Error("Forbidden: not your post");
    error.statusCode = 403;
    throw error;
  }

  if (post.Image?.publicId) {
    await cloudinaryRemoveImage(post.Image.publicId);
  }

  await post.deleteOne();
  return { deletedId: id };
};
