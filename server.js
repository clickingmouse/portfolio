const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const items = require("./routes/api/items");
//Body parser middleware
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//connect to mongoose
mongoose
  .connect(db)
  .then(() => console.log("mongo connected..."))
  .catch(err => console.log(err));

app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
