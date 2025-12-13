import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwtLib from "jsonwebtoken";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, profile }: any) {
      // Call your backend velyx-auth to create or fetch user
      const res = await fetch(`http://localhost:5001/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        }),
      });

      const data = await res.json();

      // Store MongoDB user ID inside session
      user.internalUserId = data.userId;

      return true;
    },

    async jwt({ token, user }: any) {
      // Only runs on login
      if (user) {
        token.userId = user.internalUserId;

        // Create JWT for your backend
        token.backendToken = jwtLib.sign(
          { userId: user.internalUserId },
          process.env.BACKEND_JWT_SECRET!,
          { expiresIn: "7d" }
        );
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.userId;
      session.backendToken = token.backendToken; // <-- IMPORTANT
      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
