const express = require("express");
const cors = require("cors");

const port = 5000;

const app = express();

app.use(express.json());

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// const allowCrossDomain = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

// app.use(allowCrossDomain);
app.use(cors());

app.use(express.static("public"));

//Routes
const StockRoutes = require("./routes/stockRoutes");
app.use("/stocks", StockRoutes);
const UserRoutes = require("./routes/UserRoutes");
app.use("/user", UserRoutes);

app.listen(port, console.log(`Backend rodando na porta ${port}.`));
