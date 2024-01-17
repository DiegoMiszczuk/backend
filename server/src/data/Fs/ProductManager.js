import fs from "fs";
import crypto from "crypto";


const path = "./server/src/data/fs/json/productos.json";

class ProductManager {
  static #products = [];

  init() {
    const file = fs.existsSync(path);
   
    if (!file) {
      fs.writeFileSync(path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(fs.readFileSync(path, "utf-8"));
      
    }
  }

  constructor() {
    this.init();
  
  }

  async createProducts(data) {
    try {
      const newProduct = {
       // id: crypto.randomBytes(12).toString("hex"),
        //id: 1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      if (!Object.values(newProduct).includes(undefined)) {
        ProductManager.#products.push(newProduct);

      //productos.saveProducts(ProductManager.#products);
      const produc = JSON.stringify(ProductManager.#products, null, 2);
      await fs.promises.writeFile(path, produc);
      return newProduct.id;
      } else {
        console.error("Faltan propiedades requeridas en el objeto data");
      }

      
    } catch (error) {
      return error.message;
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
      //console.log(ProductManager.#products);
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
        throw new Error("There isn't any product with id=" +id);
      } else {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        const produc = JSON.stringify(ProductManager.#products, null, 2);
        await fs.promises.writeFile(path, produc);
        //productos.saveProducts(ProductManager.#products);
        return id;

        //console.log("deleted " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateProduct(id, newData) {
    try {
      const index = ProductManager.#products.findIndex(
        (product) => product.id === id
      );

      if (index !== -1) {
        ProductManager.#products[index] = {
          ...ProductManager.#products[index],
          ...newData,
        };

        const produc = JSON.stringify(ProductManager.#products, null, 2);
        await fs.promises.writeFile(path, produc);

        return id;
      } else {
        return "not found";
      }
    } catch (error) {
      return error.message;
    }
  }
}
/*saveProducts = async (el) => {
    try {
      const produc = JSON.stringify(el, null, 2);
      await fs.promises.writeFile(path, produc);
    } catch (error) {
      return error.message;
      // console.log("Error while saving");
    }
  };
}*/

const productos = new ProductManager(path);

/*productos.create({
  title: "phone",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

//productos.destroy("6c06ff0d0b2bdccfdedaee4b");

//productos.read()
//productos.updateProduct("dfbf19486784aec1461b8c96",{ title: "telefono feo" })
//productos.readOne(1);
//productos.readOne(1);
//productos.read();*/
export default productos;
