import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { addReceipt, deleteReceiptById } from "../../../dist/services/receiptService.mjs";
import { connectToDatabase, disconnectFromDatabase, collections } from "../../../dist/config/db.mjs";

let receiptId;
const receiptObject = {
    name: "AddTest",
    surname: "User",
    address: "123 Street",
    items: [],
    total: 250
};

beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await deleteReceiptById(receiptId);
    await disconnectFromDatabase();
});

describe("Add receipt functionality", () => {
    test("Add receipt positive case", async () => {
        receiptId = await addReceipt(receiptObject);

        const inserted = await collections.receipts.findOne({ _id: receiptId });
        expect(inserted).not.toBeNull();
        expect(inserted.name).toBe(receiptObject.name);
    });
});
