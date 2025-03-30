import { Router } from "express";
import {
    createReceipt,
    getReceipts,
    updateReceipt,
    deleteReceipt
} from "../controllers/receiptControlles.mjs";

const router = Router();

router.get("/", getReceipts);
router.post("/", createReceipt);
router.put("/:id", updateReceipt);
router.delete("/:id", deleteReceipt);

export default router;
