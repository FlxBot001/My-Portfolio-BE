import NextAuth from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import CredentialProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialProvider({
            //Name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            //The credentials is used to generate a suitable form on the sign in page.
            credentials: {
                //username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const db = await connectToDatabase();
                const collection = db.collection('admin');
            }
        })
        
    ]
})