import crypto from "crypto";

import usuarios from "./UserManager.js";
import productos from "./ProductManager.js";

class OrdersManager {
  static orders = [];

  constructor() {}

  async createOrder(uid, pid, quantity) {
    try {
      const product = productos.readOne(pid);
      const user = usuarios.readOne(uid);

      if (!user || !product) {
        throw new Error("User or product not found");
      }

      const newOrder = {
        //oid: crypto.randomBytes(12).toString("hex"),
        oid:
          OrdersManager.orders.length === 0
            ? 1
            : OrdersManager.orders[OrdersManager.orders.length - 1].id + 1,
        userId: user.id,
        productId: product.id,
        quantity,
      };

      OrdersManager.orders.push(newOrder);

      console.log(OrdersManager.orders);
      return console.log(" created order id:  " + newOrder.oid);
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
          return console.log(OrdersManager.orders);
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
        return console.log(find);
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
      let one = OrdersManager.orders.find((element) => element.oid === oid);
      if (!one) {
        throw new Error("there is no order with that id");
      } else {
        OrdersManager.orders = OrdersManager.orders.filter(
          (each) => each.oid !== oid
        );

        return console.log("deleted order whit id " + oid);
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

        return console.log("updated order whit id " + oid);
      } else {
        return "not found";
      }
    } catch (error) {
      return error.message;
    }
  }
}

const orders = new OrdersManager();
//export default orders;

orders.createOrder(1, 1, 2);
//orders.read()
//orders.read();
orders.read();
//orders.readOne(7)
//orders.destroy(1)
//console.log(orders.readOne(1))
//console.log(orders.destroy("389425c54d5774961881b896"))
//.then((newOrder) => {
//console.log("New order created:", newOrder);
orders.updateOrder(1, { quantity: 10000 });
orders.read();
//const orders = new OrdersManager(path);

//orders.createOrder("ee6aa0e0e93784d3e7cd40e9", "dfbf19486784aec1461b8c96", "2", {
// pid: 12,
//uis: "diego",
//quantity: 1,
// state: "sold"
//});
