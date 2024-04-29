// mongodb+srv://sojeong:20020923@boilerplate.3h6zg21.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate

const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");

const { User } = require("./models/User");

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!! 안녕안녕"));

app.post("/register", async (req, res) => {
  // 회원가입 시 필요 정보를 client에서 가져오면
  // DB에 넣어줌

  const user = new User(req.body);
  // save 하기 전에 암호화를 해줘야 함
  await user
    .save()
    .then(() => {
      // 성공 시
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});
app.listen(port, () => console.log(`Example app listeming on port ${port}!`));
