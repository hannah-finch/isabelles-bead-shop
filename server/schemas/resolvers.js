//TODO import user
// the users query is dummy data.... must be changed
//TODO import auths
const resolvers = {
  Query: {
    users: async (_, { input }) => {
      //TODO implement logic to fetch users from database
    },
  },
  //   Mutation: {
  //     createUser: async (_, { input }) => {
  //       //TODO implement logic to create a new user in the database
  //     },
  //   },
};

module.exports = resolvers;
