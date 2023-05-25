import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" }
      // },

      async authorize(credentials, req) {
        const { username, password } = credentials;

        const user = await axios.post(`${process.env.DOMAIN_URL}/api/auth/login`, { username, password });

        if (user) return user;
        return 'User not defined';
      },
    }),
  ],

  secret: process.env.NEXT_PUBLIC_SECRET,

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
