const { User, Product } = require("../models");
//TODO import auths
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  //! QUERIES
  Query: {
    me: async (parent, args, context) => {
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

    //* User Mutations
    //********************************* */

    //* Product Mutations
    //********************************* */

    createProduct: async (_, input) => {
      const product = await Product.create(input);
      return product;
    },
    updateProduct: async (
      _,
      { _id, name, price, description, image, category }
    ) => {
      const product = await Product.findByIdAndUpdate(
        { _id },
        { name, price, description, image, category},
        { new: true }
      );
      return product;
    },
    deleteProduct: async (_,{_id}) => {
      const product = await Product.findByIdAndDelete({_id})
      return product
    },

    addReview: async (_, { _id, ReviewDetails }) => {
      const updProduct = await Product.findByIdAndUpdate(
        { _id: _id },
        {
          $addToSet: {
            reviews: ReviewDetails,
          },
        },
        { new: true, runValidators: true }
      ).populate([{ path: "username", strictPopulate: false }]);
      return updProduct;
    },
  },
};

module.exports = resolvers;
