const { Schema, models, model } = require('mongoose');

const ContactSchema = new Schema({
    firstname: { type: String, required: true },
    middlename: { type: String},
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    profilepic: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String},
    company: { type: String},
    role: { type: String},
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String },
    project: [{ type: String }]
}, {
    timestamps: true, // This will automatically manage createdAt and UpdatedAt
});

export const Contact = models.Contact || model('Contact', ContactSchema, 'contacts');