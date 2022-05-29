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

app.listen(3000, () => {
  console.log("server on!");
});
