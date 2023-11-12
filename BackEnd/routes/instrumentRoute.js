import express from "express";
import * as instrumentController from "../controller/instrumentController.js";
import verifyToken  from "../middleWare/verifyToken.js";

const router = express.Router();

router.post("/", instrumentController.createInstrument);
router.get("/all/:uid", instrumentController.getAllInstruments);
router.get("/:id", instrumentController.getInstrumentById);
router.get("/category/:category", instrumentController.getInstrumentsByCategory);
router.put("/:id", instrumentController.updateInstrument);
router.delete("/:id", instrumentController.deleteInstrument);
router.get('/user/items', verifyToken, instrumentController.getUserItems);


export default router;
