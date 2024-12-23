import { mongooseConnect } from '@/lib/mongoose';
import Profile from '@/models/Profile';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Profile.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new Profile({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}