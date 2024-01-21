import { Router } from "express";
import productos from "../../data/Fs/ProductManager.js";

const chatRouter = Router();

chatRouter.get("/",  (req, res, next) => {
  try {
    
    //console.log(allProducts);
    return res.render("chat", { });
  } catch (error) {
    next(error);
  }
});

export default chatRouter