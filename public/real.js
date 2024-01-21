const socket = io();
console.log("socket");

socket.on("products", (data)=>{
    //console.log(data);
   data =  data.map (each => `<div class="card mb" style="width: 18rem;">
    <img src="${each.photo}" class="card-img-top " alt="...">
    <div class="card-body">
      <h5 class="card-title">${each.title}</h5>
      <p class="card-text"> Price : ${each.price}</p>
      <p class="card-text"> Available : ${each.stock}</p>
      <a href="#" class="btn btn-primary">Buy It Now</a>
      <a href="#" class="btn btn-primary">Add to cart</a>
    </div>
  </div>`
        
    ).join("")
    console.log(data);
    document.querySelector("#products").innerHTML = data
})

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
