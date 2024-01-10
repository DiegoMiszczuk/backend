import fs from "fs";
import crypto from "crypto";

const path = "./server/src/data/fs/json/orders.json";

class ordersManager {
  static orders = [];

  init(){
    const file = fs.existsSync(path)

    if (!file){
        fs.writeFileSync(path, JSON.stringify([], null, 2));
    }else{
        ordersManager.orders = JSON.parse(fs.readFileSync(path, "utf-8")); 
    }
  }

  constructor() {
    this.init();

    
  }

 async createOrders(data){

    try {
        const newOrder = {
            oid: crypto.randomBytes(12).toString("hex"),
            pid: data.pid,
            uid: data.uid,
            quantity: data.quantity,
            state: data.state,
          };
    ordersManager.orders.push(newOrder) 

    const order = JSON.stringify(ordersManager.orders, null, 2);
     await  fs.promises.writeFile(path, order);
      return newOrder.id + newOrder.uid;

    } catch (error) {
        return error.message;
    }
  }
}


const orders = new ordersManager(path)

orders.createOrders({
    pid: 12,
    uis: "diego",
    quantity: 1,
   // state: "sold"
})