//const fs = require("fs");
import fs from "fs";
import crypto from "crypto";

const path = "./server/src/data/fs/json/users.json";

class UserManager {
  static #users = [];

  constructor() {}
  init() {
    const file = fs.existsSync(path);
    if (file) {
      UserManager.#users.push(JSON.parse(fs.readFileSync(path, "utf-8")));
    } else {
      fs.writeFileSync(path, JSON.stringify([], null, 2));
    }
  }

  async create(data) {
    const newUser = {
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    if (!Object.values(newUser).includes(undefined)) {
      UserManager.#users.push(newUser);
      usuarios.saveUsers(UserManager.#users);
    } else {
      console.error("The required properties for the user are missing");
      return null;
    }
  }

  //read() {
  //  return UserManager.#users;
  //}
  read() {
    {
      try {
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

        usuarios.saveUsers(UserManager.#users);

        console.log("deleted " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  saveUsers = async (el) => {
    try {
      const users = JSON.stringify(el, null, 2);
      await fs.promises.writeFile(path, users);
    } catch (error) {
      return error.message;
     // console.log("Error while saving");
    }
  };
}

const usuarios = new UserManager(path);
export default usuarios

/*usuarios.create({
  name: "Leo",
  photo: "foto.jpg",
  email: "leo@leo.com",
});

usuarios.create({
  name: "Pedro",
  photo: "foto.jpg",
  email: "pedro@pedro.com",
});

usuarios.create({
  name: "Pablo",
  photo: "foto.jpg",
  email: "pablo@pablo.com",
});*/


//usuarios.readOne(2);

//console.table(usuarios.read());
