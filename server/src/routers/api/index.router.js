import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import orderRouter from "./orders.router.js"
//import viewsRouter from "../views/index.views.js";
//import formRouter from "../views/form.view.js";


const apiRouter = Router();
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", orderRouter);
//apiRouter.use("/form", formRouter);
//apiRouter.use("/", viewsRouter)

export default apiRouter;
