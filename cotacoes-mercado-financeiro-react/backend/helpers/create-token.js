const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const createToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    message: "Autenticação realizada",
    token,
    id: user._id,
    status: 200,
  });
};

module.exports = createToken;
