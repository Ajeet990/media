import Express from "express";
const router = Express.Router()
import { getComments } from "../controllers/cmtController.js";

router.get('/', getComments)

export default router