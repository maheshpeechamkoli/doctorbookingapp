import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { MongoHelper } from './helpers/mongo-db';
import { GraphQLSchema } from 'graphql';
import { buildGraphqlSchema } from './schema';
import { Server } from 'typescript-rest';

const app = express();
const mongoHelper = new MongoHelper();
mongoHelper.initiateMongoConnection();

const apiRouter: express.Router = express.Router();
Server.loadServices(apiRouter, ['services/*', 'repository/*'], __dirname);

new Promise<ApolloServer>(async (resolve, reject) => {
  try {
    const schema: GraphQLSchema = (await buildGraphqlSchema()) as any;

    const graphqlServer = new ApolloServer({ schema });
    await graphqlServer.start();

    graphqlServer.applyMiddleware({ app: app });

    resolve(graphqlServer);
  } catch (error) {
    reject(error);
  }
})
  .then((graphqlServer) => {
    console.log('🎉 Graphql server started');
  })
  .catch((error) => {
    console.log('Error starting graphql server', { error });
  });

app.use(cors());
const httpServer = createServer(app);

httpServer.listen({ port: process.env.PORT }, (): void =>
  console.log(`\n🎉 Doctor booking app API is running on http://localhost:${process.env.PORT}/graphql`)
);
