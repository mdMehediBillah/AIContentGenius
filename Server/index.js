import cors from "cors";
import express from "express";
import dotenv from "dotenv";

// database connection
import connectDB from "./Database/connect.js";

// routes
import postImgRouter from "./routers/postImgRouter.js";
import audioRouter from "./routers/audioRouter.js";
import chatRouter from "./routers/chatRouter.js";
import imageRouter from "./routers/imageRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import validateProvider from "./middlewares/validateProvider.js";
import validateMode from "./middlewares/validateMode.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "*" }), express.json(), validateProvider, validateMode);
app.use("/api/v1/audio/speech", audioRouter);
app.use("/api/v1/chat/completions", chatRouter);
app.use("/api/v1/images/generations", imageRouter);
app.use("/api/v1/images/ai_images", postImgRouter);
app.use("*", (req, res) => res.sendStatus(404));
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const startServer = () => {
  connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
