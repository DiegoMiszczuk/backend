class ProductManager {
  static _products = [];

  constructor(data) {
    const newProduct = {
      id:
        ProductManager._products.length === 0
          ? 1
          : ProductManager._products[ProductManager._productsproducts.length - 1].id +
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
      ProductManager._products.push(this);
    } else {
      console.error("Faltan propiedades requeridas en el objeto data");
      return null;
    }
  }

  createProducts(data) {
    const newProduct = {
      id:
        ProductManager._productsproducts.length === 0
          ? 1
          : ProductManager._products[ProductManager._products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager._products.push(newProduct);
    } else {
      console.error("Faltan propiedades requeridas en el objeto data");
      return null;
    }
  }

  destroy(id) {
    try {
      let one = ProductManager._products.find((element) => element.id === id);
      if (!one) {
        throw new Error("There isn't any product with id=");
      } else {
        ProductManager._products = ProductManager._productsproducts.filter(
          (each) => each.id !== id
        );
        const produc = JSON.stringify(ProductManager._products, null, 2);
       fs.promises.writeFile(path, produc);
        //productos.saveProducts(ProductManager.#products);
        return id;

        //console.log("deleted " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    return ProductManager._productsproducts;
  }
  readOne(id) {
    const buscado = ProductManager._products.find(
      (Element) => Element.id === id
    );

    if (buscado) {
      console.log("Producto encontrado: ", buscado);
    } else {
      console.log("Producto no encontrado");
    }
  }



}



const productos = new ProductManager({
  title: "Samsung",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.createProducts({
  title: "Nokia",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.createProducts({
  title: "Motorola",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.createProducts({
  title: "Iphone",
  photo: "foto.jpg",
  price: 10,
  stock: 20,
});

productos.readOne(4);
console.table(productos.read());