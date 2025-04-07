import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { Product } from "../../../dist/entities/Product.mjs";
import { addProduct, deleteProductById } from "../../../dist/services/productService.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../../../dist/config/db.mjs";
import { generateRandomString } from "../../../dist/support/support.mjs";
import { collections } from "../../../dist/config/db.mjs";

let productId;
const productName = `testName${generateRandomString()}`;

beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await deleteProductById(productId);
    await disconnectFromDatabase();
});

describe("Add product functionality", () => {
    test("Add product functionality positive case", async () => {
        const productObject = new Product(productName, "testDescription", 100, 99);
        productId = await addProduct(productObject);

        const inserted = await collections.products.findOne({ _id: productId });
        expect(inserted).not.toBeNull();
        expect(inserted.productName).toBe(productName);
    });
});
