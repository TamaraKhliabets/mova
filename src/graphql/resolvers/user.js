const { ApolloError } = require("apollo-server-express");
const { hash } = require("bcryptjs");

const { serializeUser } = require("../../functions");

module.exports = {
  Query: {
    getAllUsers: async (_, {}, { User }) => {
      return await User.find();
    },
    getUser: async (_, { id }, { User }) => {
      let user = await User.findById(id).exec();
      if (!user) {
        throw new ApolloError("User not found.", "400");
      }
      return user;
    }
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      let { username, email } = newUser;

      // // First Check if the username is already taken
      let user;
      user = await User.findOne({ username });
      if (user) {
        throw new ApolloError("USER_ALREADY_REGISTERED", "422");
      }

      // If the email taken
      email = await User.findOne({ email });
      if (email) {
        throw new ApolloError("EMAIL_ALREADY_REGISTERED", "422");
      }

      // Create new User Instance
      user = new User(newUser);

      // Hash the password
      user.password = await hash(newUser.password, 10);

      // The Save the user to the database
      let result = await user.save();
      result = result.toObject();
      result.id = result._id;
      result = serializeUser(result);

      // Issue the Authentication Token
      // in future add token
      // let token = await issueToken(result);
      return {
        user: result
      };
    }
  }
};
