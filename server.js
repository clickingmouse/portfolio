const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const items = require("./routes/api/items");
const dotenv = require("dotenv");

dotenv.config();

//Body parser middleware
app.use(bodyParser.json());

//DB Config
//const db = require("./config/keys").mongoURI;
//console.log(process.env.REACT_APP_MONGO_URI);
const db = process.env.REACT_APP_MONGO_URI;
//connect to mongoose
mongoose
  .connect(db)
  .then(() => console.log("mongo connected..."))
  .catch(err => console.log(err));

app.use("/api/items", items);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
