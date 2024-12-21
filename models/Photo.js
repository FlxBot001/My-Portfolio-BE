const { Schema, models, model } = require('mongoose');

const PhotoSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    scenery: { type: String },
}, {
    timestamps: true, // This will automatically manage createdAt and UpdatedAt
});

export const Photos = models.Photos || model('Photos', PhotoSchema, 'photos');