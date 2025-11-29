const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./auth/authMiddleware");
const logger = require("./utils/logger");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

// CORS configuration - allow specific origin with credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Apollo Server handles its own body parsing for GraphQL requests
// We don't need express.json() here as it conflicts with Apollo Server's internal body parser

app.use(rateLimiter);

// attach auth to req
app.use(authMiddleware);

async function startApollo() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // req.user set in authMiddleware
      return {
        user: req.user,
        loaders: {
          // dataloader stubs
          employeeById: require("./loaders/employeeLoader")()
        }
      };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startApollo()
  .then(() => logger.info("Apollo Server started"))
  .catch((e) => {
    logger.error("Apollo failed to start", e);
    process.exit(1);
  });

module.exports = app;
