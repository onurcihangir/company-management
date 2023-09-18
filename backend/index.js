const express = require("express");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://onucihangir:123@etedb.6t0zfnf.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected Successfully"))

  .catch((err) => {
    console.error(err);
  });

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/companies", require("./routes/api/companies"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/auth", require("./routes/api/users"));

app.listen(8000, () => console.log("Server started"));
