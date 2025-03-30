import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import receiptRoutes from "./routes/receiptRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

await connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/receipts", receiptRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
