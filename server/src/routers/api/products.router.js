import { Router } from "express";
import productos from "../../data/Fs/ProductManager.js";
import propProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

//definir endpoint de productos

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await productos.read();
    //console.log(allProducts);
    if (Array.isArray(allProducts)) {
      return res.status(200).json({
        success: true,
        response: allProducts,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "not found products",
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productos.readOne(pid);
    if (one) {
      return res.status(200).json(one);
    } else {
      return res.status(404).json("not found");
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

productsRouter.put("/:pid",propProducts, async (req, res, next) => {
  try {

    const { pid } = req.params;
    console.log(pid)
    const data = req.body
    const response = await productos.updateProduct(pid, data)
    //const index = ProductManager.#products.findIndex(product => product.id === id);

    if ( response  === "not found") {
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

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productos.destroy(pid);
    if (typeof response === `There isn't any product with id= ${pid}`) {
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
