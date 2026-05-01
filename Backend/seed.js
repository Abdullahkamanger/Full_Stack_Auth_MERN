import mongoose from "mongoose";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the product schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [
    {
      rating: Number,
      comment: String,
      date: Date,
      reviewerName: String,
      reviewerEmail: String
    }
  ],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: {
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String
  },
  images: [String],
  thumbnail: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const seedDB = async () => {
  try {
    // 1. Connect to your database
    const dbUri = process.env.DB_URI;
    if (!dbUri) throw new Error("DB_URI is not defined in .env");

    await mongoose.connect(dbUri);
    console.log('🔗 Database connected successfully!');

    // 2. Clear out existing collection data to prevent duplicates
    await Product.deleteMany({});
    console.log('🧹 Collection cleared!');

    // 3. Read data from JSON file
    const dataPath = path.join(__dirname, 'ProductData.json');
    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // 4. Insert the productsData
    await Product.insertMany(productsData);
    console.log(`🌱 Database seeded successfully with ${productsData.length} products!`);

    // 5. Disconnect
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDB();