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

    /** Consider adding sort to mult-record responses as the db will always be
     * more efficient at sorting than the client. You may also look at splitting up
     * different queries that would filter the data as well (i.e. productsActive, 
     * productsMarkedDelete, productsByCategory(pikachu)). Again, make the db do the work
     * and leverage the graphql caching model (i.e. configured as local memory in your config). 
     */
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

    /** I know you all didn't do typescript but I want to point out this as being
     *  one of the best use casess for it. What is input? Without a type, input could be
     *  anything, and just feeding anything to the database call could be pretty 
     *  bad news. In leui of typescript you can use a validator like Zod (https://zod.dev). 
     *  You would use this to enforce a data structure from any unknown source (i.e. a file,
     *  a 3rd party API, and most definitely from the client). Don't let scary people do
     *  scary things. 
     */
    createProduct: async (_, input) => {
      const product = await Product.create(input);
      return product;
    },
    updateProduct: async (
      _,
      { _id, name, price, description, image, category, stock }
    ) => {
      const product = await Product.findByIdAndUpdate(
        { _id },
        { name, price, description, image, category, stock },
        { new: true }
      );
      return product;
    },
    deleteProduct: async (_, { _id }) => {
      const product = await Product.findByIdAndDelete({ _id });
      return product;
    },

    /**
     * Not sure if you've see this, but this is comment that you use for documenting
     * your functions. It works by typing the / followed by 2 * above your function and pressing enter,
     * Since inputs to vanilla js are not typed, it's good to layout some expectations even if it's
     * just in documentation
    
     * @param {never} _ 
     * @param {some_object} param1 
     * @returns a list of unicorns
     */
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

    //* Order Mutations
    //********************************* */
    updateStock: async (_, { products }) => {
      try {
        for (const product of products) {
          //console.log("product.name", product.name);
          // Assuming you have a way to map Stripe line product IDs to MongoDB ObjectIds
          //const productId = await mapStripeIdToMongoId(product.name);
          //console.log("productId", productId);
          //console.log("productId._id", productId._id);
          await Product.findByIdAndUpdate(product._id, {
            $inc: { stock: -product.quantity },
          });
        }
        return true;
      } catch (error) {
        console.error("Error updating stock:", error);
        return false;
      }
    },
  },
};

// const mapStripeIdToMongoId = async (productName) => {
//   const product = await Product.findOne({ name: productName });
//   if (!product) {
//     console.error(`Product with name ${productName} not found`);
//     return null;
//   }
//   return product._id;
// };
module.exports = resolvers;
