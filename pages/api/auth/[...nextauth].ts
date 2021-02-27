import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import includes from "lodash.includes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const options = {
  providers: [
    Providers.Email({
      server: process.env.SMTP_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.AUTH_SECRET,

  database: process.env.MONGODB_URI,

  callbacks: {
    signIn: async (profile: any) => {
      const isAllowedToSignIn = includes(
        process.env.EMAIL_WHITELIST,
        profile.email
      );
      if (isAllowedToSignIn) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(
          new Error("This email is not in the allowed users list. ")
        );
      }
    },
  },

  debug: process.env.NODE_ENV === "development" ? true : false,
};

const authHandler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, options);

export default authHandler;
