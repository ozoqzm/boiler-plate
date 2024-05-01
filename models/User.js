const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const secretToken = "yourSecretToken"; // secretToken 값 설정 (임의 선택)

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 띄어쓰기 제거
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  // 토큰 사용 유효기간
  tokenExp: {
    type: Number,
  },
});

// 'save' 전 function 실행
userSchema.pre("save", function (next) {
  var user = this;

  // 비밀번호가 변경될 때만 수행
  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호 아닌 다른 정보 변경 시 넘겨준다
    next();
  }
});

// comparePassword 생성
// plain text로 들어온 입력을 암호화하여 비교. bcrypt.compare 사용
userSchema.methods.comparePassword = function (plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

// generateToken 생성: JWT 토큰 생성 메서드
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id.toString() }, secretToken);

  user.token = token;
  return user.save().then(() => token);
};

// 스키마 모델로 감싸줌
const User = mongoose.model("User", userSchema);

module.exports = { User };
