import { Request, Response } from "express";
import { addProduct, deleteProductById, searchProduct, updateProductById } from "../services/productService.mjs";
import { Product} from "../entities/Product.mjs";

export async function createProduct(req: Request, res: Response) {
    try {
        const { productName, productDescription, productQty, price } = req.body;
        const product = new Product(productName, productDescription, productQty, price);
        const productId = await addProduct(product);
        res.status(201).json({ message: "Product created", id: productId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await searchProduct({}, true);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateFields = req.body;
        const result = await updateProductById(id, updateFields);
        if (result) {
            res.status(200).json({ message: "Product updated" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const result = await deleteProductById(id);
        if (result) {
            res.status(200).json({ message: "Product deleted" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
