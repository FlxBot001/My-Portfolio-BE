import connectToDatabase from '@/lib/mongodb';
import Profile from '@/models/Profile';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { username, email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('admin');

        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new Profile({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating account' });
    }
}