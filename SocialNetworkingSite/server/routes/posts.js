import express from "express";

import { upload } from "../utils/fileStorage.js";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likesPost,
} from "../controllers/postsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/", verifyToken, getFeedPosts);

// CREATE
router.post("/", verifyToken, upload.single("picture"), createPost);

// UPDATE
router.patch("/:id/like", verifyToken, likesPost);

export default router;
