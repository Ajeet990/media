import Express from "express";
const router = Express.Router()
import { getUser } from "../controllers/userController.js";

router.get('/test', getUser)

export default router