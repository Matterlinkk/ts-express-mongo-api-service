import {collections} from "../config/db.mjs";
import {Receipt} from "../entities/Receipt.mjs";
import {logger} from "../utils/logger.mjs";
import {ObjectId} from "mongodb";

interface objectParams {
    name?: string;
    surname?: string;
    address?: string;
}

export async function addReceipt(receipt: Receipt) {
    if (!collections.receipts) {
        throw new Error("MongoDB not connected to Receipts");
    }

    try {
        const result = await collections.receipts?.insertOne(receipt)
        logger.info(`Order ID: ${result?.insertedId} saved successfully`)
        return result.insertedId
    } catch (e) {
        logger.error(`Failed to save order. Error: ${e}`)
    }
}


export async function searchReceipt(searchParams: objectParams, ignoreRegisterCase) {
    if (!collections.receipts) {
        throw new Error("MongoDB not connected");
    }

    const filter: Record<string, any> = {};

    if (searchParams.name) {
        filter.name = ignoreRegisterCase
            ? {$regex: searchParams.name, $options: "i"}
            : searchParams.name;
    }

    if (searchParams.surname) {
        filter.surname = ignoreRegisterCase
            ? {$regex: searchParams.surname, $options: "i"}
            : searchParams.surname;
    }

    if (searchParams.address) {
        filter.address = ignoreRegisterCase
            ? {$regex: searchParams.address, $options: "i"}
            : searchParams.address;
    }

    const result = await collections.receipts.find(filter).toArray()

    logger.debug(`Searched result: ${JSON.stringify(result, null, 2)}`)
    return result;
}

export async function deleteReceiptById(id: string | ObjectId) {
    if (!collections.receipts) {
        throw new Error("MongoDB not connected");
    }

    try {
        const result = await collections.receipts.deleteOne({ _id: id instanceof ObjectId ? id : new ObjectId(id) });

        if (result.deletedCount === 1) {
            logger.info(`Receipt with ID ${id instanceof ObjectId ? id.toString() : id} deleted successfully.`);
            return true;
        } else {
            logger.warn(`No receipt found with ID ${id instanceof ObjectId ? id.toString() : id}.`);
            return false;
        }
    } catch (err) {
        logger.error(`Failed to delete receipt: ${err}`);
        throw err;
    }
}

export async function updateReceiptById(id: string | ObjectId, updateFields: objectParams) {
    if (!collections.receipts) {
        throw new Error("MongoDB not connected");
    }

    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
    }

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields provided for update");
    }

    try {
        const result = await collections.receipts.updateOne(
            { _id: id instanceof ObjectId ? id : new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            logger.warn(`No receipt found with ID ${id instanceof ObjectId ? id.toString() : id}`);
            return false;
        }

        logger.info(`Receipt with ID ${id instanceof ObjectId ? id.toString() : id} updated successfully`);
        return true;
    } catch (err) {
        logger.error(`Failed to update receipt: ${err}`);
        throw err;
    }
}
