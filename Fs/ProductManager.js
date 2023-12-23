const fs = require("fs");

const path = "fs/data/productos.json";

class ProductManager {
  static #products = [];

  constructor() {}
  init() {
    const file = fs.existsSync(path);
    if (file) {
      ProductManager.#products.push(JSON.parse(fs.readFileSync(path, "utf-8")));
    } else {
      fs.writeFileSync(path, JSON.stringify([], null, 2));
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

      productos.saveProducts(ProductManager.#products);
    } else {
      console.error("Faltan propiedades requeridas en el objeto data");
      return null;
    }
  }
  read() {
    {
      try {
        if (ProductManager.#products.length === 0) {
          throw new Error("Not found products!");
        } else {
          return console.log(ProductManager.#products);
        }
      } catch (error) {
        return error.message;
      }
    }
  }

  readOne(id) {
    const buscado = ProductManager.#products.find(
      (Element) => Element.id === id
    );

    if (buscado) {
      console.log("Producto encontrado: ", buscado);
    } else {
      console.log("Producto no encontrado");
    }
  }
  saveProducts = async (el) => {
    try {
      const produc = JSON.stringify(el, null, 2);
      await fs.promises.writeFile(path, produc);
    } catch (err) {
      console.log("error al Guardar");
    }
  };
}
const productos = new ProductManager(path);

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

productos.readOne(4);
//productos.read();
