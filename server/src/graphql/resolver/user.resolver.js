import User from "../../model/User.js";
import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { withRole } from "../helpers/withRole.js";

export const blacklist = new Set();
const userResolver = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return context.user;
    },
    allUsers: withRole(["admin"], async (_, __, context) => {
      const users = await User.find();
      return users;
    }),
  },

  Mutation: {
    register: async (_, { name, username, password, role }) => {
      const userExists = await User.findOne({ username });

      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        username,
        role,
        password: hashedPassword,
      });

      const token = generateToken(user._id);

      return {
        token,
        user,
      };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Invalid username or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid username or password");
      }

      const token = generateToken(user._id);

      return {
        token,
        user,
      };
    },

    logout: async (_, __, context) => {
      const token = context.token; // get from headers
      if (!token) throw new Error("Not authenticated");
      // add token to blacklist
      blacklist.add(token);
      return { message: "Logged out successfully" };
    },
  },
};

export default userResolver;
