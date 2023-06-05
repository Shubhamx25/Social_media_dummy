import { Router } from "express";
import { getFeedPosts, getUserPosts,likePosts } from "../controllers/post.js";
import verifyToken from "../middleware/verifyToken.js";
let router = Router();

// Get your feed data 
router.get('/',verifyToken, getFeedPosts);
router.get('/:userId/posts',verifyToken, getUserPosts);

// like a post
router.patch('/:id/like', verifyToken, likePosts);


export default router;