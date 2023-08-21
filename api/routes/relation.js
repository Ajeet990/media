import Express from "express";
const router = Express.Router()
import { addRelationship, getRelationships, deleteRelation } from "../controllers/relationController.js";

router.get('/', getRelationships)
router.post('/', addRelationship)
router.delete('/', deleteRelation)


export default router