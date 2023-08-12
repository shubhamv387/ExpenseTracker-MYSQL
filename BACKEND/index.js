const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./utils/database");

const errorController = require("./controller/404");

const expenseRouter = require("./router/expense");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/expenses", expenseRouter);

app.use(errorController.error);

sequelize
  .sync()
  .then((res) => {
    app.listen(4000, () => {
      //   console.log(res);
      console.log("Server is running ");
    });
  })
  .catch((err) => console.log(err.message));
