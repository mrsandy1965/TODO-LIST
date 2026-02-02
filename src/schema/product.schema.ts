import mongoose, { Schema, Document } from 'mongoose';

export interface ProductInterface extends Document {
    name: string;
    description?: string;
    price: number;
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

ProductSchema.index({ name: 'text', description: 'text' });

export const ProductModel = mongoose.model<ProductInterface>('Product', ProductSchema);
