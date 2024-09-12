const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
//TODO implement your own secret key
//TODO maybe environment variable
const secret = "your_secret_key";
const expiration = "1h";

module.exports = {
  AuthenticationError: new GraphQLError("AuthenticationError", {
    extensions: {
      code: "UNAUTHENTICATED",
      message: "You need to be authenticated to access this resource.",
    },
  }),
  authMiddleware: function ({}) {
    //TODO implement your own authentication logic
  },
  signToken: function ({ userName, password }) {
    const payload = { userName, password };

    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
