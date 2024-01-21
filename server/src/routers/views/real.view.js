import { Router } from "express";
import productos from "../../data/Fs/ProductManager.js";

const realRouter = Router();

realRouter.get("/", async (req, res, next) => {
  try {
    
    //console.log(allProducts);
    return res.render("real", { });
  } catch (error) {
    next(error);
  }
});

export default realRouter