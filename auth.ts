import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "./models/User";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

 callbacks: {
  async signIn({ profile } : any) {
    const res = await fetch(`${process.env.VELYX_SERVERURL}/auth/oauth`, {
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

    profile.internalUserId = data.userId;

    return true;
  },
  async jwt({ token, profile } : any) {

  if (profile?.internalUserId) {
    token.userId = profile.internalUserId;
  }

  return token;
  },
  async session({ session, token } : any) {
    session.user.id = token.userId;
    return session;
  }
}

};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
