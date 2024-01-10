import fs from "fs";
import crypto from "crypto";
import UserManager from "./UserManager.js"

const path = "./server/src/data/fs/json/orders.json";
const pathUser = "./server/src/data/fs/json/users.json";

class ordersManager {
  static orders = [];
 // static users = [];

  init() {
    const file = fs.existsSync(path);

    if (!file) {
      fs.writeFileSync(path, JSON.stringify([], null, 2));
    } else {
      ordersManager.orders = JSON.parse(fs.readFileSync(path, "utf-8"));
    }
  }
  /*initUsers() {
    const file = fs.existsSync(pathUser);

    if (!file) {
      fs.writeFileSync(pathUser, JSON.stringify([], null, 2));
    } else {
      ordersManager.users = JSON.parse(fs.readFileSync(pathUser, "utf-8"));
    }
  }*/

  constructor() {
    this.init();
    //this.initUsers();
  }

  async createOrders(uid, data) {
    try {
      const user = UserManager.users.find((user) => user.uid === uid);

      if (user === uid) {
        ordersManager.orders = {
          ...ordersManager.orders[uid],
          ...data,
        };

        const produc = JSON.stringify(ordersManager.orders, null, 2);
        await fs.promises.writeFile(path, produc);

        return oid;
      } else {
        return "not found";
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    {
      try {
        if (ordersManager.orders.length === 0) {
          throw new Error("Not found products!");
        } else {
          return ordersManager.orders;
        }
      } catch (error) {
        return error.message;
      }
    }
  }

  readOne(uid) {
    try {
      //console.log(ProductManager.#products);
      const order = ordersManager.orders.find((Element) => Element.uid === uid);
      if (order) {
        return order;
        // console.log("Product found: ", buscado);
      } else {
        throw new Error("order not found");
        //console.log("Product not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async destroy(oid) {
    try {
      let one = ordersManager.orders.find((element) => element.oid === oid);
      if (!one) {
        throw new Error("There isn't any product with id=");
      } else {
        ordersManager.orders = ordersManager.orders.filter(
          (each) => each.oid !== oid
        );
        const orders = JSON.stringify(ordersManager.orders, null, 2);
        await fs.promises.writeFile(path, orders);
        //productos.saveProducts(ProductManager.#products);
        return " deleted " + oid;

        //console.log("deleted " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateOrder(oid, newData) {
    try {
      const index = ordersManager.orders.findIndex(
        (order) => order.oid === oid
      );

      if (index !== -1) {
        ordersManager.orders[index] = {
          ...ordersManager.orders[index],
          ...newData,
        };

        const produc = JSON.stringify(ordersManager.orders, null, 2);
        await fs.promises.writeFile(path, produc);

        return oid;
      } else {
        return "not found";
      }
    } catch (error) {
      return error.message;
    }
  }
}

const orders = new ordersManager(path);

orders.createOrders("50b2410d6c4df16c9687e750", {
  pid: 12,
  uis: "diego",
  quantity: 1,
  // state: "sold"
});
