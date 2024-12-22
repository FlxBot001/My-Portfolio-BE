const { Schema, models, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfileSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true, // This will automatically manage createdAt and updatedAt
});

// Hash the password before saving the user model
ProfileSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

export const Profile = models.Profile || model('Profile', ProfileSchema, 'admin');

//export default models.Profile || model('Profile', ProfileSchema, 'admin');