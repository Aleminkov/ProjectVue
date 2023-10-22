const ApiError = require("../Error/ApiError");
const { findUser, checkEmail, checkUser, createUser } = require("../db");

class userController {
  async login(req, res, next) {
    const { email, password } = req.body;

    const find = await findUser(email, password);

    if (!find) {
      return next(ApiError.interval("Не верный пароль или email"));
    }

    return res.json(true);
  }

  async registration(req, res, next) {
    const { name, email, password } = req.body;

    const findEmail = await checkEmail(email);
    if (findEmail) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    const findName = await checkUser(name);
    if (findName) {
      return next(
        ApiError.badRequest("Пользователь с таким именем уже существует")
      );
    }

    await createUser(name, email, password);
    return res.json(true);
  }
}

module.exports = new userController();
