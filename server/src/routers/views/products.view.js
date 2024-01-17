import { Router } from "express";
import productos from "../../data/Fs/ProductManager.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await productos.read();
    //console.log(allProducts);
    return res.render("products", { products: allProducts });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form", {});
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
