import express from "express";
import productos from "./server/Fs/ProductManager.js";

const server = express();

const PORT = 8080;

server.use(express.urlencoded({ extended: true }));

const ready = () => console.log(`server ready on port ${PORT}`);

server.listen(PORT, ready);

server.get("/api/products", (req, res) => {
  try {
    const allProducts = productos.read();
    if (Array.isArray(allProducts)) {
      return res.status(200).json({
        success: true,
        response: allProducts,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: allProducts,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/product/:eid", (req, res) => {
  try {
    const { eid } = req.params;
    const one = productos.readOne(eid);
    if (one) {
      return res.status(200).json(one);
    } else {
      return res.status(404).json("not found");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
