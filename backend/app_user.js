const express = require("express");
const argon2 = require("argon2");
const app = express();

const database = [
  {
    id: 1,
    username: "abc",
    password: "abc",
  },
];

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.send("test");
});

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
    res.send("해당하는 id가 없습니다. ");
    return;
  }

  // username 이 중복이 되지않는다는 가정하에 user[0] 사용
  // argon2.verify 는 맞으면 true, 틀리면 false 가 나오기 때문에
  // 패스워드가 틀리다고 res.send 를 보낼거면 ! 를 붙여줘야함.
  if(!(await argon2.verify(user[0].password, password))) {
    res.send("패스워드가 틀립니다.");
    return;
  }

  res.send("로그인 성공!");
});

app.listen(3000, () => {
  console.log("server on!");
});
