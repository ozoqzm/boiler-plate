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

// 로그인
app.post("/login", (req, res) => {
  // 요청된 이메일 데이터베이스에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호 일치 확인
    user.compatePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호 일치 시 토큰 생성
      user.generateToken((err, user) => {
        // 후술
      });
    });
  });
});

app.listen(port, () => console.log(`Example app listeming on port ${port}!`));
