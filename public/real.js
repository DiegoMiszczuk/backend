const socket = io();
console.log("socket");
socket.on("welcome", (message) => alert(message));
/*socket.emit("newProduct", {

    title: "creacion desde el back",
    photo: "https://picsum.photos/200/200",
    price: 10,
    stock: 20
})*/

socket.on("createdProduct", (message) => alert(message));

document.querySelector("#newProduct").addEventListener("click", (product) => {
  product.preventDefault();
  const title = document.querySelector("#title").value;
  console.log(title)
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  console.log(data);
  socket.emit("newProduct", data);
});
