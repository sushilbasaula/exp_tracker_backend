import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

console.log(process.env);

const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan";

import path from "path";
const __dirname = path.resolve();

//connect mongoDB
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routers
import userRouter from "./src/routers/userRouter.js";
import transRouter from "./src/routers/transRouter.js";
import { userAuth } from "./src/middlewares/authMiddleware.js";
// User Router to handle user registration and login
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", userAuth, transRouter);
// transaction router to handle all transaction related CRUD operations

// static content serve
app.use(express.static(path.join(__dirname, "/client/build")));

//serving frontend
app.use("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "/index.html"));
  } catch (error) {
    next(error);
  }
});

// uncaught router request
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Requested resources not found.",
  };
  next(error);
});

// Global Error Handler
app.use((error, req, res, next) => {
  try {
    const errorCode = error.errorCode || 500;
    res.status(errorCode).json({
      status: "error",
      message: error.message,
    });
  } catch (error) {
    res.status(500).json({
      status: " error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("server is running at http://localhost:${PORT}");
});
