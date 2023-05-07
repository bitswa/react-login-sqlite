const UsersController = require("../controller/UsersController");
const { Router } = require("express");

const usersController = new UsersController();
const usersRoutes = Router();

usersRoutes.get("/", usersController.getProfile);
usersRoutes.post("/register", usersController.create);
usersRoutes.post("/login", usersController.login);

module.exports = usersRoutes;
