import cors from "cors";
import express from "express";
import logger from "morgan";
import { NODE_ENV } from "./env";
import indexRouter from "./routes";

const app = express();

// Setup request body parser.
app.use(express.json());

// Setup logger.
app.use(logger("dev"));

// Setup CORS header.
app.use(cors({ origin: NODE_ENV === "development" }));

// Setup routers.
app.use(indexRouter);

export default app;
