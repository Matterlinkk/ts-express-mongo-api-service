import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { Product } from "../../../dist/entities/Product.mjs";
import {
    addProduct,
    deleteProductById,
    updateProductById
} from "../../../dist/services/productService.mjs";
import { connectToDatabase, disconnectFromDatabase, collections } from "../../../dist/config/db.mjs";
import { generateRandomString } from "../../../dist/support/support.mjs";
import { ObjectId } from "mongodb";

let productId;
const productName = `updateTest${generateRandomString()}`;

beforeAll(async () => {
    await connectToDatabase();
    const product = new Product(productName, "desc", 10, 5);
    productId = await addProduct(product);
});

afterAll(async () => {
    await deleteProductById(productId);
    await disconnectFromDatabase();
});

describe("Update product functionality", () => {
    test("Update product price", async () => {
        const updatedPrice = 777;

        const updated = await updateProductById(productId, { productPrice: updatedPrice });
        expect(updated).toBe(true);

        const updatedProduct = await collections.products.findOne({ _id: new ObjectId(productId) });
        expect(updatedProduct).not.toBeNull();
        expect(updatedProduct.productPrice).toBe(updatedPrice);
    });
});
