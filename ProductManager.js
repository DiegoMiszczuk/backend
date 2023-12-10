class ProductManager {
  static #products = [];

  constructor(data) {
    const newProduct = {
      id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
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
    } else {
      console.error('Faltan propiedades requeridas en el objeto data');
      return null;
    }
  }

  create(data) {
    const newProduct = {
      id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager.#products.push(newProduct);
    } else {
      console.error('Faltan propiedades requeridas en el objeto data');
      return null;
    }
  }
  read() {
    return ProductManager.#products;
  }readOne(id){
   // return console.log("Producto encontrado" + ProductManager.#products.find(Element => Element.id === id))}
     const buscado = ProductManager.#products.find(Element => Element.id === id)

     if(buscado) {
      console.log("Producto encontrado: " , buscado);
         }else{
          console.log("Producto no encontrado")
         }
        }

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

productos.readOne(4)
console.table(productos.read());

