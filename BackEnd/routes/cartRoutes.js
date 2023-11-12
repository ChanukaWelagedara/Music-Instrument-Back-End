import express from "express";
import {createCart,getAll,getAll2} from "../controller/cartController.js";
import verifyToken  from "../middleWare/verifyToken.js";


const router = express.Router();

router.post("/", createCart);
router.get("/all/:uid", getAll);
router.delete("/buy/:uid", getAll2);

// router.get("/:id", instrumentController.getInstrumentById);
// router.get("/category/:category", instrumentController.getInstrumentsByCategory);
// router.put("/:id", instrumentController.updateInstrument);
// router.delete("/:id", instrumentController.deleteInstrument);
// router.get('/user/items', verifyToken, instrumentController.getUserItems);


export default router;
