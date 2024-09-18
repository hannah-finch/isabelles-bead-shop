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
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    // console.log(token);
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    return req;
  },
  signToken: function ({ username, password, role }) {
    const payload = { username, password, role };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
