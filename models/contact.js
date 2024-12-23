const { Schema, models, model } = require('mongoose');

const ContactSchema = new Schema({
    firstname: { type: String, required: true },
    middlename: { type: String},
    lastname: { type: String},
    username: { type: String},
    profilepic: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String},
    company: { type: String},
    role: { type: String},
    address: { type: String},
    city: { type: String},
    state: { type: String},
    zip: { type: String},
    country: { type: String},
    description: { type: String },
    project: [{ type: String }]
}, {
    timestamps: true, // This will automatically manage createdAt and UpdatedAt
});

export const Contact = models.Contact || model('Contact', ContactSchema, 'contacts');