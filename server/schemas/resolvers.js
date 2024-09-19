const { User, Product } = require("../models");

//TODO import auths
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  //! QUERIES
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user.username);
      if (context.user) {
        return User.findOne({ username: context.user.username });
      } else {
        throw AuthenticationError;
      }
    },
    users: async (_) => {
      const users = await User.find();
      return users;
    },
    products: async (_) => {
      const products = await Product.find();
      return products;
    },
    singleProduct: async (_, { productId }) => {
      const product = await Product.findOne({ _id: productId });
      return product;
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
      const token = signToken(user);

      return { token, user };
    },
    //* Sign In Mutation
    //********************************* */
    //TODO MAKE LOGIN ACCEPT EMAIL TOO
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw AuthenticationError;
      const valid = await user.validatePassword(password);
      if (!valid) throw AuthenticationError;
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
