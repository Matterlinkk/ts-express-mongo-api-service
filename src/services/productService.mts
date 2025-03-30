import { collections } from "../config/db.mjs";
import { logger } from "../utils/logger.mjs";
import { ObjectId } from "mongodb";
import { Product } from "../entities/Product.mjs";

interface ProductSearchParams {
    productName?: string;
    productDescription?: string;
}

export async function addProduct(product: Product) {
    if (!collections.products) {
        throw new Error("MongoDB not connected to Products");
    }

    try {
        const result = await collections.products.insertOne(product);
        logger.info(`Product ID: ${result.insertedId} saved successfully`);
        return result.insertedId
    } catch (e) {
        logger.error(`Failed to save product. Error: ${e}`);
    }
}

export async function searchProduct(searchParams: ProductSearchParams, ignoreCase: boolean = true) {
    if (!collections.products) {
        throw new Error("MongoDB not connected");
    }

    const filter: Record<string, any> = {};

    if (searchParams.productName) {
        filter.productName = ignoreCase
            ? { $regex: searchParams.productName, $options: "i" }
            : searchParams.productName;
    }

    if (searchParams.productDescription) {
        filter.productDescription = ignoreCase
            ? { $regex: searchParams.productDescription, $options: "i" }
            : searchParams.productDescription;
    }

    const result = await collections.products.find(filter).toArray();
    logger.debug(`Searched products: ${JSON.stringify(result, null, 2)}`);
    return result;
}

export async function deleteProductById(id: string | ObjectId) {
    if (!collections.products) {
        throw new Error("MongoDB not connected");
    }

    try {
        const result = await collections.products.deleteOne({ _id: id instanceof ObjectId ? id : new ObjectId(id) });

        if (result.deletedCount === 1) {
            logger.info(`Product with ID ${id instanceof ObjectId ? id.toString() : id} deleted successfully.`);
            return true;
        } else {
            logger.warn(`No product found with ID ${id instanceof ObjectId ? id.toString() : id}.`);
            return false;
        }
    } catch (err) {
        logger.error(`Failed to delete product: ${err}`);
        throw err;
    }
}

export async function updateProductById(id: string | ObjectId, updateFields: Partial<Product>) {
    if (!collections.products) {
        throw new Error("MongoDB not connected");
    }

    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
    }

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields provided for update");
    }

    try {
        const result = await collections.products.updateOne(
            { _id: id instanceof ObjectId ? id : new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            logger.warn(`No product found with ID ${id instanceof ObjectId ? id.toString() : id}`);
            return false;
        }

        logger.info(`Product with ID ${id instanceof ObjectId ? id.toString() : id} updated successfully`);
        return true;
    } catch (err) {
        logger.error(`Failed to update product: ${err}`);
        throw err;
    }
}
