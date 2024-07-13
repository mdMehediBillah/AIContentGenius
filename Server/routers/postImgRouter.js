import { Router } from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import imgPostModel from "../Database/models/imagePost.js";

dotenv.config();

// postImageRouter
const postImgRouter = Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get all images
postImgRouter.get("/", async (req, res) => {
  try {
    const images = await imgPostModel.find({});
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new image
postImgRouter.post("/", async (req, res) => {
  try {
    const { prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newImagePost = await imgPostModel.create({
      prompt,
      photo: photoUrl.url,
    });
    res.status(201).json({ success: true, data: newImagePost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default postImgRouter;
