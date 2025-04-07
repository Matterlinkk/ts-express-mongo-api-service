import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { logger } from "../utils/logger.mjs";

export const collections: {
    receipts?: mongoDB.Collection;
    products?: mongoDB.Collection;
} = {};

export let client: mongoDB.MongoClient;

export async function connectToDatabase() {
    try {
        dotenv.config();

        client = new mongoDB.MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@api-service-ts.y4rw0us.mongodb.net/?retryWrites=true&w=majority&appName=api-service-ts`);
        await client.connect();

        const db = client.db(process.env.DB_NAME || "product-db");

        const receiptsCollection = db.collection(process.env.COLLECTION_RECEIPTS_NAME || "Receipt");
        const productsCollection = db.collection(process.env.COLLECTION_PRODUCT_NAME || "Product");

        collections.receipts = receiptsCollection;
        collections.products = productsCollection;

        logger.info(`Connected to DB: ${db.databaseName}`);
        logger.info(`Receipts collection: ${receiptsCollection.collectionName}`);
        logger.info(`Products collection: ${productsCollection.collectionName}`);
        logger.debug(`Available collections: ${Object.keys(collections).join(", ")}`);
    } catch (err) {
        console.error("DB connection error:", err);
        throw err;
    }
}

export async function disconnectFromDatabase() {
    if (client) {
        await client.close();
        logger.info("MongoDB connection closed");
    }
}
