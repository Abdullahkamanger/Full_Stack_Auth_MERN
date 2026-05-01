import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    tags: [String],
    brand: {
        type: String,
        trim: true
    },
    sku: {
        type: String,
        trim: true
    },
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
            date: { type: Date, default: Date.now },
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
    thumbnail: {
        type: String,
        default: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// We keep the virtual 'id' mapping for compatibility if needed, 
// although now we have a numeric 'id' field as well.
// If the frontend specifically uses the MongoDB _id as 'id', we keep this.
// But since the JSON has a numeric 'id', we might have a conflict.
// Let's name the virtual 'mongoId' to avoid confusion, or keep it as is if 'id' is already used.
// The user said "id" in the model and JSON is numeric.
// productSchema.virtual('mongoId').get(function() {
//     return this._id.toHexString();
// });

export default mongoose.model("Product", productSchema);
