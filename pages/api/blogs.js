import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res){


    // If authnticated, connect to MongoDB
    await mongooseConnect();

    const {method} = req;

    if (method === 'POST') {
        
    }
}