const User = require("../models/User");

module.exports = class UserController {
  static async createUser(req, res) {
    const { name, nickname, email, password, confirmPassword } = req.body;

    console.log(nickname);

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
      const user = new User({ name, nickname, email, password });

      await user.save();

      res.status(201).json({ message: "Usuário criado com sucesso" });
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

    const userExists = await User.findOne({ email, password });

    if (!userExists) {
      res.status(500).json({ message: "E-mail ou senha inválido" });
      return;
    }

    res
      .status(200)
      .json({ data: userExists, message: "Usuário logado com sucesso" });
  }
};
