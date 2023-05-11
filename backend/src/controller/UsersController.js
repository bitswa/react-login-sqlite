const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/appError");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();

    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email],
    );

    if (checkUserExist) {
      throw new AppError("Email já está em uso.");
    }

    const hashedPassword = await hash(password, process.env.BCRYPT_SALT);

    const { lastID } = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [
        name,
        email.toLowerCase(),
        hashedPassword,
      ],
    );

    const token = jwt.sign({ id: lastID }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.status(201).json({
      user: {
        id: lastID,
        name,
        email,
      },
      token: token,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const database = await sqliteConnection();

    const user = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email],
    );

    if (!user) {
      throw new AppError("E-mail ou senha invalido");
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new AppError("E-mail ou senha invalido");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    res.json({
      user: userLogin,
      token: token,
    });
  }

  async update(req, res) {
    const { id, name, photo } = req.body;

    const database = await sqliteConnection();

    await database.run(
      "UPDATE users SET name = (?), photo_url = (?) WHERE id = (?)",
      [
        name,
        photo,
        id,
      ],
    );

    const user = await database.get(
      "SELECT * FROM users WHERE id = (?)",
      [id],
    );

    const { password: _, ...newUser } = user;

    res.json(newUser);
  }

  async getProfile(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Não autorizado");
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const database = await sqliteConnection();

    const user = await database.get(
      "SELECT * FROM users WHERE id = (?)",
      [id],
    );

    if (!user) {
      throw new AppError("usuario não autorizado");
    }

    const { password: _, ...loggedUser } = user;

    res.json(loggedUser);
  }
}

module.exports = UsersController;
