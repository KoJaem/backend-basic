const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { validUser } = require("./middleware/auth");
const database = require("./database");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// 테스트용 코드(원래는 이런게 있으면 안됨!)
app.get("/users", (req, res) => {
  res.send(database);
});

// 회원가입
app.post("/signup", async (req, res) => {
  // 패스워드 abc -> 암호화 -> sadjgkljzxb
  const { username, password, age, birthday } = req.body;
  const hash = await argon2.hash(password);
  database.push({
    username,
    password: hash,
    age,
    birthday,
  });
  res.send("success");
});

// 로그인 코드
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = database.filter(user => {
    return user.username === username;
  });
  if (user.length === 0) {
    res.status(403).send("해당하는 id가 없습니다. "); // FORBIDDEN
    return;
  }

  // username 이 중복이 되지않는다는 가정하에 user[0] 사용
  // argon2.verify 는 맞으면 true, 틀리면 false 가 나오기 때문에
  // 패스워드가 틀리다고 res.send 를 보낼거면 ! 를 붙여줘야함.
  if (!(await argon2.verify(user[0].password, password))) {
    res.status(403).send("패스워드가 틀립니다."); // FORBIDDEN
    return;
  }

  const access_token = jwt.sign({ username }, "secure"); // username 을 토큰화 시킴
  res.cookie("access_token", access_token, {
    httpOnly: true,
  });

  res.send("로그인 성공!");
});

app.get("/secure_data", validUser, (req, res) => {
  res.send("인증된 사용자만 쓸 수 있는 API 성공!");
});

app.get('/new_secure_data', validUser, (req, res) => {
  res.send('인증된 사용자만 쓸 수 있음');
})

app.listen(3000, () => {
  console.log("server on!");
});
