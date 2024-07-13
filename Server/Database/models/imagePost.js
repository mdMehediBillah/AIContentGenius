import mongoose from "mongoose";
const imagePostSchema = new mongoose.Schema(
  {
    name: { typpe: String },
    email: { typpe: String },
    photo: { typpe: String },
  },
  {
    timestamps: true,
  }
);
const PostImageSchema = mongoose.model("PostImage", imagePostSchema);
export default PostImageSchema;
