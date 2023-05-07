import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

type Profile = {
  email?: string;
  username?: string;
  image?: string;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn(params: { profile?: Profile }) {
      try {
        await connectToDB();
        const { email } = params.profile || {};
        const user = await User.findOne({
          email,
        });

        if (!user) {
          await User.create({
            ...params.profile,
            username: email?.split("@")[0],
          });
        }
        return true;
      } catch (error) {
        console.error("Error connecting to Mongo DB", error);
        return false;
      }
    },

    async session(params: { session: Session }) {
      const userSession = await User.findOne({
        email: params.session.user?.email,
      });

      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: userSession?._id.toString(),
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
