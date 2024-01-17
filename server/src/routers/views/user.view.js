import { Router } from "express";

import usuarios from "../../data/Fs/UserManager.js";

const userRouter = Router();

userRouter.use("/", (req, res, next) => {
  try {
   
    return res.render("register", {  });
  } catch (error) {
    next(error);
  }
});

export default userRouter