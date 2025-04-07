import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { addReceipt, deleteReceiptById } from "../../../dist/services/receiptService.mjs";
import { connectToDatabase, disconnectFromDatabase, collections } from "../../../dist/config/db.mjs";
import { ObjectId } from "mongodb";

let receiptId;
const receiptObject = {
    name: "DeleteTest",
    surname: "Target",
    address: "999 Lane",
    items: [],
    total: 300
};

beforeAll(async () => {
    await connectToDatabase();
    receiptId = await addReceipt(receiptObject);
});

afterAll(async () => {
    await disconnectFromDatabase();
});

describe("Delete receipt functionality", () => {
    test("Delete receipt by ID", async () => {
        const deleted = await deleteReceiptById(receiptId);
        expect(deleted).toBe(true);

        const found = await collections.receipts.findOne({ _id: new ObjectId(receiptId) });
        expect(found).toBeNull();
    });
});
