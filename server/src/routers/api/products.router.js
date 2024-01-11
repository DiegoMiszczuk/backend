import { Router } from "express";
import productos from "../../data/Fs/ProductManager.js";
import propProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await productos.read();

    if (Array.isArray(allProducts)) {
      return res.json({
        statusCode: 200,
        message: "found",
        allProducts,
      });
      
    } else {
      return res.json({
        statusCode: 404,
        message: allProducts,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productos.readOne(pid);
    if (response === "Product not found") {
     
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        message: "found",
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.post("/", propProducts, async (req, res, next) => {
  try {
    const data = req.body;

    const response = await productos.createProducts(data);

    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", propProducts, async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log(pid);
    const data = req.body;
    const response = await productos.updateProduct(pid, data);

    if (response === "not found") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        message: "updated product",
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productos.destroy(pid);
    if ( response === "There isn't any product with id=" + pid) {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
