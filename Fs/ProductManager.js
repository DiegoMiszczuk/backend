const fs = require("fs");

const path = "fs/data/productos.json";

class ProductManager {
  static #products = [];

  constructor(data) {
    const newProduct = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      this.id = newProduct.id;
      this.title = newProduct.title;
      this.photo = newProduct.photo;
      this.price = newProduct.price;
      this.stock = newProduct.stock;
      ProductManager.#products.push(this);

      const products = JSON.stringify(ProductManager.#products, null, 2);

      fs.promises
        .writeFile(path, products)
        .then(res=>console.log("exito"))
        .catch((error) => console.log(error));
    } else {
      console.error("Faltan propiedades requeridas en el objeto data");
      return null;
    }
  }

   async create(data) {
    const newProduct = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager.#products.push(newProduct);
      const products = JSON.stringify(ProductManager.#products, null, 2);

      await fs.promises
        .writeFile(path, products)
        .then(res=>console.log("exito"))
        .catch((error) => console.log(error));
    } else {
      console.error("Faltan propiedades requeridas en el objeto data");
      return null;
    }
  }
  async read() {
    try {
      const productos = await fs.promises.readFile(path,'utf-8')
    const produ = JSON.parse(productos) 
    } catch (error) {
      return error
    }
    //return ProductManager.#products;
     
//   console.log(produ)
    //console.log(lista)
    
  }
  async readOne(id) {
    let producto = await fs.promises.readFile(path, 'utf-8')
    let productoParse = JSON.parse(producto)
    console.log(productoParse)
    try {
      const nuevoArray = productoParse.find((ele) => {
        return ele.id === id
      })
      console.log(nuevoArray)

    } catch (error) {
      console.log("No se encontro el producto")
    }

  }
/*   readOne(id) {
    const buscado = ProductManager.#products.find(
      (Element) => Element.id === id
    );

    if (buscado) {
      console.log("Producto encontrado: ", buscado);
    } else {
      console.log("Producto no encontrado");
    }
  } */
}

const productos = new ProductManager({
  title: "Samsung",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.create({
  title: "Nokia",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.create({
  title: "Motorola",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.create({
  title: "Iphone",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.readOne(1);
productos.read();
