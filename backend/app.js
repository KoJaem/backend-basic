const express = require("express");
const app = express();

const database = [
  { id: 1, title: "글1" }, // database[0]
  { id: 2, title: "글2" },
  { id: 3, title: "글3" },
];

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http://localhost:3000
// Todo ejs pug
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/database", function (req, res) {
  res.send(database);
});

// 특정 id 글 요청
app.get("/database/:id", function (req, res) {
  // req 로 받아온 id 는 String 이므로 Number 로 바꿔줘야함
  const id = req.params.id;
  const data = database.find(el => el.id === Number(id));
  res.send(data);
});




// params 를 통해 글 추가(요청)를 받는방법 (많이 사용하지는 않음.)
// : 을 쓰고 뒤에 어떤값(지금은 title)을적으면
// : 뒤에 있는 url 은 title 로 보겠다 라는 뜻임.
app.get("/database/:title", function (req, res) {
  const title = req.params.title;
  database.push({
    id: database.length + 1,
    title,
  });
  res.send("값 추가가 정상적으로 완료되었습니다.");
});

// ★ body 를 통해 글 추가(요청)를 받는방법
// get 메소드 (X) / post 메소드 (O)
// body 에 담아오는거를 읽어오려면
// bodyParser 라는것을 express 에 추가해줘야함. (위쪽에 있음)
app.post("/add-database", function (req, res) {
  const title = req.body.title;
  database.push({
    id: database.length + 1,
    title,
  });
  res.send("값 추가가 정상적으로 완료되었습니다.");
});

// 글 수정
app.post("/update-database", function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  database[id-1].title = title;
  res.send("값 수정이 정상적으로 완료되었습니다.");
});

// 글 삭제
app.post("/delete-database", function (req, res) {
  const id = req.body.id;
  // splice 메소드 : 어떤 값을 삭제하고 싶은 시작 지점 인덱스부터 n개를 삭제해주는 메소드
  database.splice(id - 1, 1);
  res.send("값 삭제가 정상적으로 완료되었습니다.");
});

app.listen(3000, () => {
  console.log("server on!");
});
