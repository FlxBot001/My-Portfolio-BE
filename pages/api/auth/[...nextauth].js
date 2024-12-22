import NextAuth from 'next-auth';
import connectToDatabase from '@/lib/mongodb'; // Ensure this path is correct
import CredentialProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export default NextAuth({
    providers: [
        CredentialProvider({
            //Name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            //The credentials is used to generate a suitable form on the sign in page.
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            
            async authorize(credentials, req) {
                // connecting to database
                const db = await connectToDatabase();
                const collection = db.collection('admin');

                const user = await collection.findOne({ email: credentials.email });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, email: user.email };
                }

                return null;
            },
        }),
    ],

    database: process.env.MONGODB_URI,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token.id;
            return session;
        }
    },

    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET, // Add secret
})