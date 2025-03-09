import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";


import {getHistory,addToHistory,deleteFromHistory} from "../controllers/historyController.js"
const router = Router();



router.get('/',verifyToken,getHistory);
router.post("/",verifyToken,addToHistory);
router.delete("/:id",verifyToken,deleteFromHistory);








export default router

