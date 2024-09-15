const { User, Product } = require("../models");

//TODO import auths
const resolvers = {
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
  Mutation: {
    //* User Mutations
    //********************************* */

    createUser: async (_, input) => {
      const user = await User.create(input);
      return user;
    },
    //* Product Mutations
    //********************************* */
    createProduct: async (_, input) => {
      const product = await Product.create(input);
      return product;
    },
  },
};

module.exports = resolvers;
