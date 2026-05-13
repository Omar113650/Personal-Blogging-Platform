import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
      trim: true,
    },

    Content: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },

    Image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },

    AuthorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", PostSchema);
