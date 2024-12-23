const { Schema, models, model } = require('mongoose'); // Import the mongoose module

const ProfileSchema = new Schema({ // This is the schema for the Profile collection
    email: { type: String, required: true }, // required field
    password: { type: String, required: true }, // required field
    
}, {
    timestamps: true, // This will automatically manage createdAt and UpdatedAt
});

export const Profile = models.Profile || model('Profile', ProfileSchema, 'admin'); // The third argument is the collection name in the database