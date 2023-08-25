import Express from "express";
const router = Express.Router()
import { getPosts,addPost,deletePost } from "../controllers/postController.js";

router.get('/', getPosts)
router.post('/', addPost)
router.delete('/:postId', deletePost)

export default router