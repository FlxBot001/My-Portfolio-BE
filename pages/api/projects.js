import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            const blogs = await Project.find();
            res.status(200).json(blogs);
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'POST') {
        try {
            const { title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;
            const blogDoc = await Project.create({
                title,
                slug,
                images,
                description,
                client,
                projectcategory,
                tags,
                livepreview,
                status
            });
            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error creating project:', error);
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
                client,
                projectcategory,
                tags,
                livepreview,
                status
            } = req.body;

            await Project.updateOne({ _id }, {
                title,
                slug,
                images,
                description,
                client,
                projectcategory,
                tags,
                livepreview,
                status
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating project:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Project.deleteOne({ _id: req.query.id });
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ error: 'Bad Request' });
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}