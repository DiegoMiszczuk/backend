import fs from "fs";
import crypto from "crypto";

const path = "./server/fs/data/productos.json";

class ProductManager {
  static #products = [];

  constructor() {}
  init() {
    const file = fs.existsSync(path);
    console.log(file);
    if (file) {
      ProductManager.#products.push(JSON.parse(fs.readFileSync(path, "utf-8")));
    } else {
      fs.writeFileSync(path, JSON.stringify([], null, 2));
    }
  }

  async create(data) {
    const newProduct = {
      id: crypto.randomBytes(12).toString("hex"),
      //id: 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager.#products.push(newProduct);

      productos.saveProducts(ProductManager.#products);
    } else {
      console.error("Required properties are missing in the data object");
      return null;
    }
  }
  read() {
    {
      try {
        if (ProductManager.#products.length === 0) {
          throw new Error("Not found products!");
        } else {
          return ProductManager.#products;
        }
      } catch (error) {
        return error.message;
      }
    }
  }

  readOne(id) {
    try {
      console.log(ProductManager.#products);
      const buscado = ProductManager.#products.find(
        (Element) => Element.id === id
      );
      if (buscado) {
        return buscado;
        // console.log("Product found: ", buscado);
      } else {
        throw new Error("Product not found");
        //console.log("Product not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async destroy(id) {
    try {
      let one = ProductManager.#products.find((element) => element.id === id);
      if (!one) {
        throw new Error("There isn't any product with id=" + id);
      } else {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );

        productos.saveProducts(ProductManager.#products);

        console.log("deleted " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  saveProducts = async (el) => {
    try {
      const produc = JSON.stringify(el, null, 2);
      await fs.promises.writeFile(path, produc);
    } catch (error) {
      return error.message;
     // console.log("Error while saving");
    }
  };
}

const productos = new ProductManager(path);

productos.create({
  title: "phone",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

//productos.destroy("960ab4bd8a7cfb7a9b4bfceb");

//productos.readOne(1);
//productos.readOne(1);
//productos.read();
export default productos;
