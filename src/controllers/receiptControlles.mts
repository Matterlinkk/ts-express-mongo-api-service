import { Request, Response } from "express";
import { addReceipt, deleteReceiptById, searchReceipt, updateReceiptById } from "../services/receiptService.mjs";
import { Receipt } from "../entities/Receipt.mjs";

export async function createReceipt(req: Request, res: Response) {
    try {
        const { name, surname, address, product, quantity, price } = req.body;
        const receipt = new Receipt(name, surname, address, product, quantity, price);
        const receiptId = await addReceipt(receipt);
        res.status(201).json({ message: "Receipt created", id: receiptId});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getReceipts(req: Request, res: Response) {
    try {
        const receipts = await searchReceipt({}, true);
        res.status(200).json(receipts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateReceipt(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateFields = req.body;
        const result = await updateReceiptById(id, updateFields);
        if (result) {
            res.status(200).json({ message: "Receipt updated" });
        } else {
            res.status(404).json({ error: "Receipt not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteReceipt(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const result = await deleteReceiptById(id);
        if (result) {
            res.status(200).json({ message: "Receipt deleted" });
        } else {
            res.status(404).json({ error: "Receipt not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
