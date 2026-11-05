import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(
  process.env.MONGODB_URL ?? "mongodb://localhost:27017",
);
const db = client.db("knit-civic");
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const socialProviders =
  githubClientId && githubClientSecret
    ? {
      github: {
        clientId: githubClientId,
        clientSecret: githubClientSecret,
      },
    }
    : undefined;

export const auth = betterAuth({
  plugins: [
    jwt(),
  ],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60,
    }
  },
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  ...(socialProviders ? { socialProviders } : {}),
});
