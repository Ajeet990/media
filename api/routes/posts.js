import Express from "express";
const router = Express.Router()
import { getPosts,addPost } from "../controllers/postController.js";

router.get('/', getPosts)
router.post('/', addPost)

export default router