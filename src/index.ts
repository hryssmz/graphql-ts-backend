// index.ts
import http from "http";
import app from "./app";
import { HOST, PORT, NODE_ENV } from "./env";
import { startApolloServer } from "./utils/apollo";

const httpServer = http.createServer(app);

startApolloServer(httpServer)
  .then(async server => {
    server.applyMiddleware({ app, path: "/graphql" });
    await new Promise<void>(resolve =>
      httpServer.listen({ host: HOST, port: PORT }, resolve)
    );
    console.log(`${NODE_ENV} server running on ${HOST}:${PORT}`);
  })
  .catch(console.error);
