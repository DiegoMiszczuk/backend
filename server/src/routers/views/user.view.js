import { Router } from "express";

import usuarios from "../../data/Fs/UserManager.js";

const userRouter = Router();

userRouter.get("/", (req, res, next) => {
  try {
   
    return res.render("register", {  });
  } catch (error) {
    next(error);
  }
});


/*userRouter.get("/chat", (req,res,next ) =>{
  try {
    return res.render("chat", {})
  } catch (error) {
    next(error)
  }
})*/
export default userRouter