import { Router } from "express";
import usuarios from "../../data/Fs/UserManager.js";
import propUser from "../../middlewares/propsUsers.mid.js";
import propUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await usuarios.read();

    if (Array.isArray(allUsers)) {
      return res.json({
        statusCode: 200,
        message: " users found",
        allUsers,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: allUsers,
      });
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usuarios.readOne(uid);
    if (one) {
      return res.status(200).json(one);
    } else {
      return res.status(404).json("not found");
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.post("/", propUsers, async (req, res, next) => {
  try {
    const data = req.body;

    const response = await usuarios.createUser(data);

    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", propUser, async (req, res, next) => {
  try {
    const { uid } = req.params;

    const data = req.body;
    const response = await usuarios.updateUser(uid, data);

    if (response === "not found") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        message: "updated User",
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await usuarios.destroy(uid);
    if (response === "There isn't any user with id=" + uid) {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
