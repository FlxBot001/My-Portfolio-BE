const { Schema, models, model } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String }, // This will be a string because we may have prices like $1000.00 (decimal)
    status: { type: String },
}, {
    timestamps: true, // This will automatically manage createdAt and UpdatedAt
});

export const Shop = models.Shop || model('Shop', ProductSchema, 'shops');