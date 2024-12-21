import { mongooseConnect } from "@/lib/mongoose";
import { Photos } from "@/models/Photo";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            const blogs = await Photos.find();
            res.status(200).json(blogs);
        } catch (error) {
            console.error('Error fetching photos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'POST') {
        try {
            const { title, slug, images, description, scenery } = req.body;
            const blogDoc = await Photos.create({
                title,
                slug,
                images,
                description,
                scenery
            });
            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error creating photo frames:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'PUT') {
        try {
            const {
                _id,
                title,
                slug,
                images,
                description,
                scenery
            } = req.body;

            await Photos.updateOne({ _id }, {
                title,
                slug,
                images,
                description,
                scenery
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating photos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Photos.deleteOne({ _id: req.query.id });
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ error: 'Bad Request' });
            }
        } catch (error) {
            console.error('Error deleting photos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}