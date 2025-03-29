import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { logger } from "../utils/logger.mjs";

export const collections: {
    receipts?: mongoDB.Collection;
    products?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
    try {
        dotenv.config();

        const client = new mongoDB.MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@api-service-ts.y4rw0us.mongodb.net/?retryWrites=true&w=majority&appName=api-service-ts`);
        await client.connect();

        const db = client.db(process.env.DB_NAME || "test");

        const receiptsCollection = db.collection(process.env.COLLECTION_RECEIPTS_NAME || "receipts");
        const productsCollection = db.collection(process.env.COLLECTION_PRODUCT_NAME || "products");

        collections.receipts = receiptsCollection;
        collections.products = productsCollection;

        logger.info(`Connected to DB: ${db.databaseName}`);
        logger.info(`Receipts collection: ${receiptsCollection.collectionName}`);
        logger.info(`Products collection: ${productsCollection.collectionName}`);
    } catch (err) {
        console.error("❌ DB connection error:", err);
    }
}
