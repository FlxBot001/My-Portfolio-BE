import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";


export default async function handle(req, res) {
    //If authnticated ...
    await mongooseConnect();

    const { method } = req;

    if (method === 'POST') {
        try {
            const { title, slug, images, description, blogcategory, tags, status } = req.body;
            const blogDoc = await Blog.create({
                title,
                slug,
                images,
                description,
                blogcategory,
                tags,
                status
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
                title,
                slug,
                images,
                description,
                blogcategory,
                tags,
                status
            } = req.body;

            await Blog.updateOne({ _id }, {
                title,
                slug,
                images,
                description,
                blogcategory,
                tags,
                status
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Blog.deleteOne({ _id: req.query.id });
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