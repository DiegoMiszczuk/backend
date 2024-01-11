import { Router } from "express";
import orders from "../../data/Fs/ordersManager.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
    try {
      const allOrders = await orders.read();
  
      if (Array.isArray(allOrders)) {
        return res.status(200).json({
          success: true,
          response: allOrders,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "not found orders",
        });
      }
    } catch (error) {
      return next(error);
    }
  });

  orderRouter.get("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await orders.readOne(oid);
      if (one) {
        return res.status(200).json(one);
      } else {
        return res.status(404).json("not found");
      }
    } catch (error) {
      return next(error);
    }
  });

 orderRouter.post("/:uid/:pid/:quantity",  async (req, res, next) => {
    try {
      //const data = req.body;
      //const uid = req.params
      //const pid =req.params
      //const quantity = req.params
      const response = await orders.createOrder(uid,pid,quantity);
  
      return res.json({
        statusCode: 201,
        message: "created",
        response,
      });
    } catch (error) {
      return next(error);
    }
  });

  orderRouter.delete("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await orders.destroy(oid);
      if (response === "There isn't any order with id=") {
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

  export default orderRouter