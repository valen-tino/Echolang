import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/db/mongodb';
import { UserCollection } from '@/lib/db/models/user';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please add NEXTAUTH_SECRET to your environment variables');
}

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const client = await clientPromise;
        const db = client.db();
        
        const user = await db.collection(UserCollection).findOne({ 
          email: credentials.email 
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        // In production, you should use proper password hashing
        if (credentials.password !== 'password') { // Temporary for development
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };