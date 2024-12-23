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

        const user = await collection.findOne({ email: credentials.email });
        if (user && user.password === credentials.password) {
          // Any object returned will be saved in `admin` property of the JWT
          return {id: user._id, email: user.email} //return user object
        }
        // If you return null or false then the credentials will be rejected
        return null
        },
    }),
    
    
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  callbacks: {
    async jwt({token, user}) { //jwt callback
      if (user) { //check if user exist
        token._id = user._id; //add user id to token
      }
      return token; //return token object 
    },

    async session({session, token}) { //session callback
      session.user._id = token._id; //add user id to session
      return session; //return session object
    }
  },

  pages: {
    signIn: '/auth/signin',
    //signOut: '/auth/signout',
    //error: '/auth/error',
    //verifyRequest: '/auth/verify-request',
    //newUser: null
  },
})