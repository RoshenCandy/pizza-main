import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      async authorize(credentials, req) {
        const { username, password } = credentials;

        const user = await axios.post(`${process.env.DOMAIN_URL}/api/auth/login`, { username, password });

        if (user) return user;
        return 'User not defined';
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
