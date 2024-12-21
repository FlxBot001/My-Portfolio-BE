const { Schema, models, model } = require('mongoose');

const ProfileSchema = new Schema({
    //username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true, // This will automatically manage createdAt and UpdatedAt
});

export const Profile = models.Profile || model('Profile', ProfileSchema, 'admin');