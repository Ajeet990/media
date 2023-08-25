import Express from "express";
const router = Express.Router()
import { getUser, updateUser } from "../controllers/userController.js";

router.get('/find/:userId', getUser)
router.put('/', updateUser)


export default router