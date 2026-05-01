import "dotenv/config";
import express from "express";
import connectDb from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import ProductRoutes from "./src/routes/ProductRoutes.js";
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,               // Allow cookies to pass through
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

connectDb();

app.use("/api/auth", userRoutes);
app.use('/api/products', ProductRoutes);


app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
