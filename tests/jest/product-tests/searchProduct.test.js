import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { Product } from "../../../dist/entities/Product.mjs";
import { addProduct, deleteProductById, searchProduct } from "../../../dist/services/productService.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../../../dist/config/db.mjs";
import { generateRandomString } from "../../../dist/support/support.mjs";

let productId;
const productName = `searchTestName${generateRandomString()}`;

beforeAll(async () => {
    await connectToDatabase();
    const product = new Product(productName, "testDesc", 10, 1);
    productId = await addProduct(product);
});

afterAll(async () => {
    await deleteProductById(productId);
    await disconnectFromDatabase();
});

describe("Search product functionality", () => {
    test("Search by name returns correct product", async () => {
        const result = await searchProduct({ productName });
        expect(result).toHaveLength(1);
        expect(result[0].productName).toBe(productName);
    });
});
