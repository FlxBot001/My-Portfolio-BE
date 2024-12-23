import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      //the name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      //The credentials option is required when using the Credentials Provider
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },

      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const { db } = await connectToDatabase();
        const collection = db.collection('admin');
        
      }
    })
    
    
  ]
})