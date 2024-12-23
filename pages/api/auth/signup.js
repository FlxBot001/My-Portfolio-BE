import { mongooseConnect } from "@/lib/mongoose";
import { Profile } from "@/models/Profile";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await mongooseConnect();

    const { email, password } = req.body;

    try {
        // check if user exists
        const existingUser = await Profile.findOne({ email });

        // if user exists, return error
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await Profile.create({
            email,
            password: hashedPassword
        });

        // return success
        return res.status(200).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error('Error creating user:', error);
        // return error
        return res.status(500).json({ error: 'Internal server error' });
    }
}