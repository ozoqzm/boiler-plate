// mongodb+srv://sojeong:20020923@boilerplate.3h6zg21.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate

const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sojeong:20020923@boilerplate.3h6zg21.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!! 안녕안녕"));
app.listen(port, () => console.log(`Example app listeming on port ${port}!`));
