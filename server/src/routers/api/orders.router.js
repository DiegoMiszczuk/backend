import { Router } from "express";
import orders from "../../data/Fs/ordersManager.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    const allOrders = await orders.read();

    if (Array.isArray(allOrders)) {
      return res.json({
        statusCode: 200,
        message: " orders found",
        allOrders,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: allOrders,
      });
    }
  } catch (error) {
    return next(error);
  }
});

orderRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.readOne(oid);
    if (response === "Order not found") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        message: " order found",
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

orderRouter.post("/:uid/:pid/:quantity", async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const pid = req.params.pid;
    const quantity = req.params.quantity;

    const response = await orders.createOrder(uid, pid, quantity);

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
    if (response === "there is no order with that id") {
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

export default orderRouter;
