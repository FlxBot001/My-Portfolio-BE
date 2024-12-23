const { Schema, models, model } = require('mongoose');

const ProfileSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true, // This will automatically manage createdAt and updatedAt
});

const Profile = models.Profile || model('Profile', ProfileSchema, 'admin');
export default Profile;