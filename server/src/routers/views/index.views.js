import { Router } from "express";
import productsRouter from "./products.view.js";
import userRouter from "./user.view.js";
import realRouter from "./real.view.js";
import formRouter from "./form.view.js";




const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", {});
  } catch (error) {
    return next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/register", userRouter)
viewsRouter.use("/real", realRouter)
viewsRouter.use("/form", formRouter)
//viewsRouter.use("/products/new", productsRouter);
export default viewsRouter;
