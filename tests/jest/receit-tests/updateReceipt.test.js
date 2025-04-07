import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { addReceipt, deleteReceiptById, updateReceiptById } from "../../../dist/services/receiptService.mjs";
import { connectToDatabase, disconnectFromDatabase, collections } from "../../../dist/config/db.mjs";
import { ObjectId } from "mongodb";

let receiptId;
const receiptObject = {
    name: "UpdateTest",
    surname: "Person",
    address: "789 Road",
    items: [],
    total: 200
};

beforeAll(async () => {
    await connectToDatabase();
    receiptId = await addReceipt(receiptObject);
});

afterAll(async () => {
    await deleteReceiptById(receiptId);
    await disconnectFromDatabase();
});

describe("Update receipt functionality", () => {
    test("Update total value", async () => {
        const newTotal = 555;
        const result = await updateReceiptById(receiptId, { total: newTotal });
        expect(result).toBe(true);

        const updated = await collections.receipts.findOne({ _id: new ObjectId(receiptId) });
        expect(updated.total).toBe(newTotal);
    });
});
