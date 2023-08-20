import Express from "express";
const router = Express.Router()
import { getLikes, addLike, deleteLike } from "../controllers/likeController.js";

router.get('/', getLikes)
router.post('/', addLike)
router.delete('/', deleteLike)

export default router