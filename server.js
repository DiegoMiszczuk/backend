import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import productos from "./server/src/data/Fs/ProductManager.js";



import router from "./server/src/routers/index.routers.js";
import errorHandler from "./server/src/middlewares/errorHandler.mid.js";
import pathHandler from "./server/src/middlewares/pathhandler.mid.js";
import __dirname from "./utils.js";

const server = express();

const PORT = 8080;

const ready = console.log(`server ready on port ${PORT}`);

//server.listen(PORT, ready);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);


socketServer.on("connection", (socket) => {

  console.log("socket connected",socket.id);
  
  console.log("hola");

  //socket.emit("welcome", "welcome to my ecommerce")

  socket.emit("products", productos.read())

  socket.on("newProduct", async (data )=>{
    try {
      const response = await productos.createProducts(data)
      if (response === "Faltan propiedades requeridas en el objeto data") {
        response
      } else {
        socket.emit("products", productos.read())
        socket.emit("createdProduct", "created product!")
        //console.log(data)
      }
     
    } catch (error) {
      console.log(error)
    }
  
  })
;
})
//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/server/src/views");

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
