const fs = require("fs");

const path = "fs/data/users.json";

class UserManager {
  static #users = [];

  constructor() {
  }
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
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    if (!Object.values(newUser).includes(undefined)) {
      UserManager.#users.push(newUser);
      usuarios.saveUsers(UserManager.#users)
    } else {
      console.error('Faltan propiedades requeridas para el usuario');
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
          return console.log(UserManager.#users);
        }
      } catch (error) {
        return error.message;
      }
    }
  }

  readOne(id) {
    const foundUser = UserManager.#users.find((element) => element.id === id);

    if (foundUser) {
      console.log('Usuario encontrado:', foundUser);
    } else {
      console.log('Usuario no encontrado');
    }
  }
  saveUsers = async (el) => {
    try {
      const users = JSON.stringify(el, null, 2);
      await fs.promises.writeFile(path, users);
    } catch (err) {
      console.log("error al Guardar");
    }
  }
}

const usuarios = new UserManager(path);



usuarios.create({
  name: 'Leo',
  photo: 'foto.jpg',
  email: 'leo@leo.com',
});

usuarios.create({
  name: 'Pedro',
  photo: 'foto.jpg',
  email: 'pedro@pedro.com',
});

usuarios.create({
  name: 'Pablo',
  photo: 'foto.jpg',
  email: 'pablo@pablo.com',
});

//usuarios.readOne(2);

//console.table(usuarios.read());