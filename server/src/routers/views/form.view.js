import { Router } from "express";
import productos from "../../data/Fs/ProductManager.js";

const formRouter = Router();

formRouter.get("/", async (req, res, next) => {
  try {
    
    //console.log(allProducts);
    return res.render("form", { });
  } catch (error) {
    next(error);
  }
});

export default formRouter