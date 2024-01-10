import express from "express";
import router from "./server/src/routers/index.routers.js";
import productos from "./server/src/data/Fs/ProductManager.js";
import usuarios from "./server/src/data/Fs/UserManager.js";
import errorHandler from "./server/src/middlewares/errorHandler.mid.js";
import pathHandler from "./server/src/middlewares/pathhandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use (express.static(__dirname+"/public"))
server.use (morgan("dev"))
server.use("/", router);
server.use(errorHandler)
server.use(pathHandler)

const ready = () => console.log(`server ready on port ${PORT}`);

server.listen(PORT, ready);

/*server.get("/api/products", async (req, res) => {
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
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await productos.readOne(pid);
    if (one) {
      return res.status(200).json(one);
    } else {
      return res.status(404).json("not found");
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;

    const response = await productos.create(data);
    if (response === "Required properties are missing in the data object") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "created",
        response,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.delete("/api/products/:pid", async (req, res) => {
  try {
   const  { pid } = req.params
   const response = await productos.destroy(pid)
   if (typeof response === "There isn't any product with id=") {
     return res.json({
      statusCode: 404,
      message: response
     })
   } else {
    return res.json({
      statusCode: 200,
      response
    })
   }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
} )

//users

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await usuarios.read();
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
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usuarios.readOne(uid);
    if (one) {
      return res.status(200).json(one);
    } else {
      return res.status(404).json("not found");
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

*/
