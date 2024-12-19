import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";


export default async function handle(req, res) {


    // If authnticated, connect to MongoDB
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
    }

    if (method === 'PUT') {
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

        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Blog.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }

}