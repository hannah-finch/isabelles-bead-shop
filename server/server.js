const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { add } = require("./models/reviews");
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
  //origin: process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL,
  origin: 'https://isabelles-bead-shop.onrender.com',
};

app.use(cors(corsOptions));

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(
      server,
      // TODO enable this when implementing auth middleware
      {
        context: authMiddleware,
      }
    )
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // STRIPE CHECKOUT ROUTES
  app.post("/create-checkout-session", async (req, res) => {
    try {
      console.log("line_items", req.body.items);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: req.body.items,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"], // Specify the allowed countries for shipping
        },
        success_url: `${req.headers.origin}/return?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/retrieve-checkout-session/:sessionId", async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });
      res.json(session);
    } catch (error) {
      console.error("Error retrieving session:", error);
      res.status(500).json({ error: error.message });
    }
  });

  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

startApolloServer();
