const mongoose = require("mongoose");
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");

const { DB_URL } = require("./config.json");
const { checkToken } = require("./middlewares/checkToken");
const usersRouter = require("./routers/usersRouter");
const mealsRouter = require("./routers/mealsRouter");
const billsRouter = require("./routers/billsRouter");

const app = express();

const CONNECTION_URL =
  "mongodb+srv://fikerte:eCwU1RVTkgAGob2s@firstcluster.gtbxmqx.mongodb.net/?retryWrites=true&w=majority";
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/users", usersRouter);
app.use("/bills", billsRouter);
app.use("/meals", mealsRouter);

app.use(function (err, req, res, next) {
  res.status(500).json({ success: false, data: err.message });
});

// mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8080, () => console.log("Listening port 8080...."));
  });
