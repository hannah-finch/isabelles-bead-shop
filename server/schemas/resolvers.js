//TODO import user
const { User } = require("../models/index");
// the users query is dummy data.... must be changed
//TODO import auths
const resolvers = {
  Query: {
    users: async (_) => {
      //TODO implement logic to fetch users from database
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    createUser: async (_, input) => {
      //TODO implement logic to create a new user in the database
      const user = await User.create(input);
      return user;
    },
  },
};

module.exports = resolvers;
