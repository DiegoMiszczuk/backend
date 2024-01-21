import productos from "../data/Fs/ProductManager.js";
import { socketServer } from "../../../server.js";
const messages = [];


export default (socket) => {
    console.log("socket connected", socket.id);
    //console.log("hola");
    //socket.emit("welcome", "welcome to my ecommerce")
    socket.emit("products", productos.read());
    socket.emit("messages", messages);
    socket.on("user", () =>{
      socket.emit("all", messages)
    })
    socket.on("new chat", (data) => {
      messages.push(data);
      console.log(data);
      socketServer.emit("all", messages)
    });
  
    socket.on("newProduct", async (data) => {
      try {
        const response = await productos.createProducts(data);
        if (response === "Faltan propiedades requeridas en el objeto data") {
          response;
        } else {
          socket.emit("products", productos.read());
          socket.emit("createdProduct", "created product!");
          //console.log(data)
        }
      } catch (error) {
        console.log(error);
      }
    });
  }