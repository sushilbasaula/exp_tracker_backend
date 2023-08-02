import express from "express";
import { createUser } from "../models/userModel/UserModel.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  console.log("Got hit to all router");
  next();
});

// creating new user
router.post("/", async (req, res, next) => {
  try {
    const result = await createUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New user has been created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create the user, Please try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "This email has been used already,  use different email or reset your password";
    }
    next(error);
  }
});

export default router;
