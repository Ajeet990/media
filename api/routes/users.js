import Express from "express";
const router = Express.Router()
import { getUser } from "../controllers/userController.js";

router.get('/find/:userId', getUser)


export default router