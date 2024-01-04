import express from "express";
import productos from "./server/Fs/ProductManager.js";
import usuarios from "./server/Fs/UserManager.js";

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const ready = () => console.log(`server ready on port ${PORT}`);

server.listen(PORT, ready);

server.get("/api/products", (req, res) => {
  try {
    const allProducts = productos.read();
    console.log(allProducts);
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

server.get("/api/users", (req, res) => {
  try {
    const allUsers = usuarios.read();
    console.log(allUsers);
    if (Array.isArray(allUsers)) {
      return res.status(200).json({
        success: true,
        response: allUsers,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "no users found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/user/:eid", (req, res) => {
  try {
    const { eid } = req.params;
    const one = usuarios.readOne(eid);
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
