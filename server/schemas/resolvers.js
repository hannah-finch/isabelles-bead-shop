const { User, Product } = require("../models");

//TODO import auths
const resolvers = {
  Query: {
    users: async (_) => {
      //TODO implement logic to fetch users from database
      const users = await User.find();
      return users;
    },
    products: async (_) => {
      //TODO implement logic to fetch products from database
      const products = await Product.find();
      return products;
    },
  },
  Mutation: {
    createUser: async (_, input) => {
      //TODO implement logic to create a new user in the database
      const user = await User.create(input);
      return user;
    },
    createProduct: async (_, input) => {
      //TODO implement logic to create a new product in the database
      const product = await Product.create(input);
      return product;
    },
  },
};

module.exports = resolvers;
