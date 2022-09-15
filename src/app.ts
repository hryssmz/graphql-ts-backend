import express from "express";
import logger from "morgan";
import indexRouter from "./routes";

const app = express();

// Setup request body parser.
app.use(express.json());

// Setup logger.
app.use(logger("dev"));

// Setup routers.
app.use(indexRouter);

export default app;
