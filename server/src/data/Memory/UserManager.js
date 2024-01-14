

class UserManager {
  static #users = [];

  constructor(data) {
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
      this.id = newUser.id;
      this.name = newUser.name;
      this.photo = newUser.photo;
      this.email = newUser.email;
      UserManager.#users.push(this);
    } else {
      console.error('Faltan propiedades requeridas en el objeto data');
      return null;
    }
  }

  create(data) {
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
    } else {
      console.error('Faltan propiedades requeridas en el objeto data');
      return null;
    }
  }

  read() {
    return UserManager.#users;
  }

  readOne(id) {
    const foundUser = UserManager.#users.find((element) => element.id === id);

    if (foundUser) {
      console.log('Usuario encontrado:', foundUser);
      return foundUser
    } else {
      console.log('Usuario no encontrado');
    }
  }
  destroy(id) {
    try {
      let one = UserManager.#users.find((element) => element.id === id);
      if (!one) {
        throw new Error("There isn't any user with id=" + id);
      } else {
        UserManager.#users = UserManager.#users.filter(
          (each) => each.id !== id
        );
        //const user = JSON.stringify(UserManager.#users, null, 2);
        // fs.promises.writeFile(path, user);
        //usuarios.saveUsers(UserManager.#users);
  
        console.log("deleted " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  updateUser(id, newData) {
    try {
      const index = UserManager.#users.findIndex(
        (user) => user.id === id
      );

      if (index !== -1) {
        UserManager.#users[index] = {
          ...UserManager.#users[index],
          ...newData,
        };

        return "update";
      } else {
        return "User not found";
      }
    } catch (error) {
      return error.message;
    }
  }
}



const usuarios = new UserManager({
  name: 'juan',
  photo: 'foto.jpg',
  email: 'juan@juan.com',
});

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
//usuarios.destroy(2)
//console.table(usuarios.read());

usuarios.updateUser(2,{
  name: 'sebastian'
  
})

export default usuarios
//console.table(usuarios.read());