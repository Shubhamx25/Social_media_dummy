import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {getUser , getUserFriends, addRemoveFriend} from "../controllers/user.js";

let router = Router();

// Get user 
router.get('/:id',verifyToken, getUser);
router.get('/:id/friends',verifyToken, getUserFriends);

// For updating content we use patch method 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;