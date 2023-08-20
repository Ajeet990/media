import Express from "express";
const router = Express.Router()
import { getComments, addComment } from "../controllers/cmtController.js";

router.get('/', getComments)
router.post('/addCmt', addComment)

export default router