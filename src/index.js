const mongoose = require("mongoose");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const AppModels = require("./models");
const { PORT, IN_PROD, MONGO_DB_CONNECTION_URL } = require("./config");

// Initialize the Express application
const app = express();

const { typeDefs, resolvers } = require("./graphql");

// playground - access to graphql on dev mode
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IN_PROD,
  context: { ...AppModels }
});

const startApp = async () => {
  try {
    await mongoose.connect(MONGO_DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`Successfully connected with database.`);

    // Inject Apollo server middleware on Express Application
    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (err) {
    console.log(err.message);
  }
};

startApp();
