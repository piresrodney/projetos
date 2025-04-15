const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// helpers
const createToken = require("../helpers/create-token");
const getToken = require("../helpers/get-token");
const criptograph = require("../helpers/password-criptograph");

module.exports = class UserController {
  static async createUser(req, res) {
    const { name, nickname, email, password, confirmPassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "Informe o nome do usuário" });
      return;
    }

    if (!nickname) {
      res.status(422).json({ message: "Informe como gostaria de ser chamado" });
      return;
    }

    if (!email) {
      res
        .status(422)
        .json({ message: "Informe o e-mail que será utilizado na conta" });
      return;
    }

    if (!password) {
      res.status(422).json({
        message: "Informe senha que será utilizada no acesso a conta",
      });
      return;
    }

    if (!confirmPassword) {
      res.status(422).json({
        message: "Informe a confirmação de senha",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({
        message: "A senha e confirmação de senha devem ser iguais",
      });

      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(422).json({
        message: "O e-mail informado já foi utilizado",
      });
      return;
    }

    try {
      const passwordHash = await criptograph(password);

      const user = new User({
        name,
        nickname,
        email,
        password: passwordHash,
      });

      await user.save();

      await createToken(user, req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });

      return;
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "Informe o e-mail de acesso" });
      return;
    }

    if (!password) {
      res.status(422).json({
        message: "Informe senha de acesso",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(500).json({
        message: "Não existe um usuário cadastro com o e-mail informado",
      });
      return;
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      res.status(500).json({
        message: "Senha inválida",
      });
      return;
    }

    await createToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "secretQueViraDoEnv");

      currentUser = await User.findOne({ email: decoded.email }).select(
        "-password"
      );
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
};
