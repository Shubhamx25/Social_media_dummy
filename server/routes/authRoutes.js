import { Router } from "express";
import { login } from "../controllers/auth.js"

const router = Router();



// login route
router.post('/login',login)


export default router;