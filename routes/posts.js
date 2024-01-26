import express from "express";
import { getFeedPosts, getUserPosts, likPost } from "../controllers/posts.js";
import{ verifyToken } from "../middleware/auth.js";

const router = express.router();
//READ
router.get("/",verifytoken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);
//update
router.patch("/:id/like",verifyToken,likepost);
export default router;