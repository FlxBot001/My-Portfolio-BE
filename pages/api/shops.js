import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            const blogs = await Shop.find();
            res.status(200).json(blogs);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'POST') {
        try {
            const { title, slug, images, description, tags, afilink, price, status } = req.body;
            const blogDoc = await Shop.create({
                title,
                slug,
                images,
                description,
                tags,
                afilink,
                price,
                status
            });
            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error creating products:', error);
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
                tags,
                afilink,
                price,
                status
            } = req.body;

            await Shop.updateOne({ _id }, {
                title,
                slug,
                images,
                description,
                tags,
                afilink,
                price,
                status
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Shop.deleteOne({ _id: req.query.id });
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ error: 'Bad Request' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}