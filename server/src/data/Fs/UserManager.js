//const fs = require("fs");
import fs from "fs";
import crypto from "crypto";
import { userInfo } from "os";

const path = "./server/src/data/fs/json/users.json";

class UserManager {
  static #users = [];
  init() {
    const file = fs.existsSync(path);
    //console.log(file)
    if (!file) {
      fs.writeFileSync(path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(path, "utf-8"));
      //console.log(UserManager.#users)
    }
  }
  constructor() {
    this.init();
  }

  async createUser(data) {
    try {
      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      UserManager.#users.push(newUser)
      const user = JSON.stringify(UserManager.#users, null, 2);
      await fs.promises.writeFile(path, user);
      return newUser.id
    } catch (error) {
      return error.message
    }
   
  }

  //read() {
  //  return UserManager.#users;
  //}
  read() {
    
      try {
        //console.log(UserManager.#users)
        if (UserManager.#users.length === 0) {
          throw new Error("Not found users!");
        } else {
          return UserManager.#users;
          //console.log(UserManager.#users);
        }
      } catch (error) {
        return error.message;
      }
    
  }

  readOne(id) {
    try {
      const foundUser = UserManager.#users.find((element) => element.id === id);
      if (foundUser) {
        return foundUser;
        // console.log('User found :', foundUser);
      } else {
        throw new Error("User not found");
        //console.log("User not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      let one = UserManager.#users.find((element) => element.id === id);
      if (!one) {
        throw new Error("There isn't any user with id=" + id);
      } else {
        UserManager.#users = UserManager.#users.filter(
          (each) => each.id !== id
        );
        const user = JSON.stringify(UserManager.#users, null, 2);
        await fs.promises.writeFile(path, user);
        //usuarios.saveUsers(UserManager.#users);

       return "deleted " + id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateUser(id, newData) {
    try {
      const index = UserManager.#users.findIndex(
        (user) => user.id === id
      );

      if (index !== -1) {
        UserManager.#users[index] = {
          ...UserManager.#users[index],
          ...newData,
        };

        const user = JSON.stringify(UserManager.#users, null, 2);
        await fs.promises.writeFile(path, user);

        return id;
      } else {
        return "not found";
      }
    } catch (error) {
      return error.message;
    }
  }
  /*saveUsers = async (el) => {
    try {
      const users = JSON.stringify(el, null, 2);
      await fs.promises.writeFile(path, users);
    } catch (error) {
      return error.message;
     // console.log("Error while saving");
    }
  };*/
}

const usuarios = new UserManager(path);

/*usuarios.createUser({
  name: "Leo",
  photo: "foto.jpg",
  email: "leo@leo.com",
});

usuarios.createUser({
  name: "Pedro",
  photo: "foto.jpg",
  email: "pedro@pedro.com",
});

usuarios.createUser({
  name: "Pablo",
  photo: "foto.jpg",
  email: "pablo@pablo.com",
});

//usuarios.readOne('f0653875a9f40ada3ae26440');
//console.log(usuarios.readOne("b894326f8a9ed046fe1fc61f"))
//usuarios.read();
//console.log(usuarios.read())
//usuarios.destroy('f0653875a9f40ada3ae26440')

usuarios.updateUser("ee6aa0e0e93784d3e7cd40e9",{
  name: "alfredo"
})*/
export default usuarios;
