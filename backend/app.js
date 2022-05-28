const express = require("express");
const app = express();



// http://localhost:3000
// render 라는걸 사용할 수도 있는데 이건
// ejs, pug 등의 키워드를 검색해서 나중에 공부해보면 좋다고 함.
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(3000, () => {
  console.log("server on!");
});
