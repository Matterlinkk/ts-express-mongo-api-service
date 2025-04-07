import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { Product } from "../../../dist/entities/Product.mjs";
import { addProduct, deleteProductById } from "../../../dist/services/productService.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../../../dist/config/db.mjs";
import { generateRandomString } from "../../../dist/support/support.mjs";
import { collections } from "../../../dist/config/db.mjs";
import { ObjectId } from "mongodb";

let productId;
const productName = `testDelete${generateRandomString()}`;

beforeAll(async () => {
    await connectToDatabase();
    const productObject = new Product(productName, "testDescription", 100, 99);
    productId = await addProduct(productObject);
});

afterAll(async () => {
    await disconnectFromDatabase();
});

describe("Delete product functionality", () => {
    test("Delete product functionality positive case", async () => {
        const deleted = await deleteProductById(productId);
        expect(deleted).toBe(true);

        const result = await collections.products.findOne({ _id: new ObjectId(productId) });
        expect(result).toBeNull();
    });
});
