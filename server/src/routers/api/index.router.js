import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import orderRouter from "./orders.router.js"

const apiRouter = Router();
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", orderRouter);

export default apiRouter;
