import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { addReceipt, deleteReceiptById, searchReceipt } from "../../../dist/services/receiptService.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../../../dist/config/db.mjs";

let receiptId;
const receiptObject = {
    name: "SearchTest",
    surname: "Query",
    address: "456 Avenue",
    items: [],
    total: 111
};

beforeAll(async () => {
    await connectToDatabase();
    receiptId = await addReceipt(receiptObject);
});

afterAll(async () => {
    await deleteReceiptById(receiptId);
    await disconnectFromDatabase();
});

describe("Search receipt functionality", () => {
    test("Search by name returns correct receipt", async () => {
        const results = await searchReceipt({ name: receiptObject.name }, true);
        expect(results.length).toBeGreaterThan(0);

        const match = results.find(r => r.name === receiptObject.name);
        expect(match).toBeDefined();
        expect(match.surname).toBe(receiptObject.surname);
    });
});
