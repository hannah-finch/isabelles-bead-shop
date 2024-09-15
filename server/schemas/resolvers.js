const { User, Product } = require("../models");

//TODO import auths
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  //! QUERIES
  Query: {
    users: async (_) => {
      const users = await User.find();
      return users;
    },
    products: async (_) => {
      const products = await Product.find();
      return products;
    },
  },

  //! MUTATIONS
  // ********************************
  Mutation: {
    //* Authentication Mutations
    //********************************* */
    //* Sign Up Mutation
    //********************************* */
    createUser: async (_, input) => {
      const user = await User.create(input);
      return user;
    },
    //* Sign In Mutation
    //********************************* */
    //TODO MAKE LOGIN ACCEPT EMAIL TOO
    login: async (_, { userName, password }) => {
      const user = await User.findOne({ userName });
      if (!user) throw new Error("User not found");
      const valid = await user.validatePassword(password);
      if (!valid) throw new Error("Invalid password");
      const token = signToken(user);
      return { token, user };
    },
    //* Sign Out Mutation
    //********************************* */
    //* User Mutations
    //********************************* */

    //* Product Mutations
    //********************************* */

    createProduct: async (_, input) => {
      const product = await Product.create(input);
      return product;
    },
  },
};

module.exports = resolvers;
