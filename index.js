const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const { User } = require("./models/User");

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!! 안녕안녕"));

// 회원가입
app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);

  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

// 로그인
app.post("/api/users/login", async (req, res) => {
  try {
    // 요청된 이메일 DB에 있는지 조회
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 있다면 비밀번호 일치 확인
    const isMatch = await user.comparePassword(req.body.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
    // 토큰 생성
    const token = await user.generateToken();
    // 쿠키 저장
    res
      .cookie("user_auth", token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
