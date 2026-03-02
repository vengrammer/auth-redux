import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { ApolloServer } from "@apollo/server";
import userResolver from "./graphql/resolver/user.resolver.js";
import userSchema from "./graphql/schema/user.schema.js";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./model/User.js";
import jwt from "jsonwebtoken";
import { blacklist } from "./graphql/resolver/user.resolver.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

connectDB();

const server = new ApolloServer({
  typeDefs: userSchema,
  resolvers: userResolver,
});

await server.start();

app.use(
  "/graphql",
  express.json(),
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization;

      if (!authHeader) return {};

      const token = authHeader.split(" ")[1];

      if (blacklist.has(token)) {
        throw new Error("Token has been logged out / blacklisted");
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        console.log("Context user:", user);
        return { user, token };
      } catch (err) {
        return {};
      }
    },
  }),
);

app.listen(PORT, () => {
  console.log(`graphql running at http://localhost:${PORT}/graphql`);
});