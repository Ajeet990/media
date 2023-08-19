import Express from "express";
const router = Express.Router()
import { getPosts } from "../controllers/postController.js";

router.get('/', getPosts)

export default router