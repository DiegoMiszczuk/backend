import fs from "fs";

import crypto from "crypto";
import UserManager from "./UserManager.js";

const pathProducts = "./server/src/data/fs/json/productos.json";
const pathUsers = "./server/src/data/fs/json/users.json";
const pathOrders = "./server/src/data/fs/json/orders.json";

class OrdersManager {
  static orders = [];

  init() {
    const fileExists = fs.existsSync(pathOrders);
    if (!fileExists) {
      fs.writeFileSync(pathOrders, JSON.stringify([], null, 2));
    } else {
      OrdersManager.orders = JSON.parse(fs.readFileSync(pathOrders, "utf-8"));
    }
  }

  constructor() {
    this.init();
  }

  async createOrder(uid, pid, quantity) {
    try {
      const productsData = await fs.promises.readFile(pathProducts, "utf-8");
      const usersData = await fs.promises.readFile(pathUsers, "utf-8");
      const products = JSON.parse(productsData);
      const users = JSON.parse(usersData);

      const user = users.find((user) => user.id === uid);
      const product = products.find((product) => product.id === pid);

      if (!user || !product) {
        throw new Error("User or product not found");
      }

      const newOrder = {
        oid: crypto.randomBytes(12).toString("hex"),
        userId: user.id,
        productId: product.id,
        quantity,
      };

      OrdersManager.orders.push(newOrder);
      const order = JSON.stringify(OrdersManager.orders, null, 2);
      await fs.promises.writeFile(pathOrders, order);

      console.log(newOrder.oid);
      return newOrder.oid;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    {
      try {
        if (OrdersManager.orders.length === 0) {
          throw new Error("Not found orders!");
        } else {
          return OrdersManager.orders;
        }
      } catch (error) {
        return error.message;
      }
    }
  }
  readOne(oid) {
    try {
      const find = OrdersManager.orders.find((Element) => Element.oid === oid);
      if (find) {
        return find;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(oid) {
    try {
      console.log(orders);
      let one = OrdersManager.orders.find((element) => element.oid === oid);
      if (!one) {
        throw new Error("there is no order with that id");
      } else {
        OrdersManager.orders = OrdersManager.orders.filter(
          (each) => each.oid !== oid
        );
        const rest = JSON.stringify(OrdersManager.orders, null, 2);
        await fs.promises.writeFile(pathOrders, rest);

        return "deleted " + oid;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateOrder(oid, newData) {
    try {
      const index = OrdersManager.orders.findIndex(
        (element) => element.oid === oid
      );
      if (index !== -1) {
        OrdersManager.orders[index] = {
          ...OrdersManager.orders[index],
          ...newData,
        };
        const modified = JSON.stringify(OrdersManager.orders, null, 2);
        await fs.promises.writeFile(pathOrder, modified);
        return oid;
      } else {
        return "not found";
      }
    } catch (error) {
      return error.message;
    }
  }
}

const orders = new OrdersManager();
export default orders;


//orders.createOrder("06a3b7dbdf6197b7c80df7fb", "17b0e699a7d7cb56d64fd11d", 2);
//orders.read()
//console.log(orders.read())
//console.log(orders.readOne("f25e4317d1a117f38c3a3970"))
//console.log(orders.destroy("389425c54d5774961881b896"))
//.then((newOrder) => {
//console.log("New order created:", newOrder);
//orders.updateOrder("0a097fa5381622375ca767b3", { quantity: 10000 });
//const orders = new OrdersManager(path);

//orders.createOrder("ee6aa0e0e93784d3e7cd40e9", "dfbf19486784aec1461b8c96", "2", {
// pid: 12,
//uis: "diego",
//quantity: 1,
// state: "sold"
//});
