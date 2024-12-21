import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            const blogs = await Contact.find();
            res.status(200).json(blogs);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'POST') {
        try {
            const { 
                firstname,
                middlename,
                lastname,
                username,
                profilepic,
                email,
                phone,
                gender,
                company,
                role,
                address,
                city,
                state,
                zip,
                country,
                description,
                project,
            } = req.body;

            const blogDoc = await Contact.create({
                firstname,
                middlename,
                lastname,
                username,
                profilepic,
                email,
                phone,
                gender,
                company,
                role,
                address,
                city,
                state,
                zip,
                country,
                description,
                project,
               
            });
            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'PUT') {
        try {
            const {
                _id,
                firstname,
                middlename,
                lastname,
                username,
                profilepic,
                email,
                phone,
                gender,
                company,
                role,
                address,
                city,
                state,
                zip,
                country,
                description,
                project,
            } = req.body;

            await Contact.updateOne({ _id }, {
                firstname,
                middlename,
                lastname,
                username,
                profilepic,
                email,
                phone,
                gender,
                company,
                role,
                address,
                city,
                state,
                zip,
                country,
                description,
                project,
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Contact.deleteOne({ _id: req.query.id });
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ error: 'Bad Request' });
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}