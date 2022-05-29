const express = require("express");
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
app.post("/signup", (req, res) => {
  const { username, password, age, birthday } = req.body;
  database.push({
    username,
    password,
    age,
    birthday,
  });
  res.send("success");
});

// 로그인 코드
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = database.filter(user => {
    return user.username === username;
  });
  if (user.length === 0) {
    res.send("해당하는 id가 없습니다. ");
    return;
  }

  // username 이 중복이 되지않는다는 가정하에 user[0] 사용
  if (user[0].password !== password) {
    res.send("패스워드가 틀립니다.");
    return;
  }

  res.send("로그인 성공!");
});

app.listen(3000, () => {
  console.log("server on!");
});
