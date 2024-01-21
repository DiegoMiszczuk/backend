import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";


import router from "./server/src/routers/index.routers.js";
import errorHandler from "./server/src/middlewares/errorHandler.mid.js";
import pathHandler from "./server/src/middlewares/pathhandler.mid.js";
import __dirname from "./utils.js";
import socketUtils from "./server/src/utils/socket.utils.js";


const server = express();
const PORT = 8080;
const ready = console.log(`server ready on port ${PORT}`);

//server.listen(PORT, ready);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

socketServer.on("connection", socketUtils);

//views
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


export {socketServer}