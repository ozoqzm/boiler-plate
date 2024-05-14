const { User } = require("../models/User");

const auth = async (req, res, next) => {
  // 인증 처리 수행
  try {
    // 클라이언트 쿠키에서 토큰 가져옴
    const token = req.cookies.user_auth;

    if (!token) {
      return res.json({ isAuth: false, error: true });
    }

    // 토큰 복호화 후 유저 찾기
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    // 토큰 유저 정보를 req에 넣어줌(사용할 수 있게)
    req.token = token;
    req.user = user;
    next(); // middleware 에서 계속 갈 수 있게
  } catch (err) {
    throw err;
  }
};

module.exports = { auth };
