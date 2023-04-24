
const express = require("express");
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts.js");
const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js")
const loginsRouter = require("./routes/logins.js");
const commentsRouter = require("./routes/comments.js");


const cookieParser = require("cookie-parser");
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//URL_encoded형식으로 전송된 데이터를 해석하여 req.body에 저장
app.use(cookieParser());//전역 미들웨어에 cookieParser 등록
app.use("/", [postsRouter, indexRouter, commentsRouter, usersRouter, loginsRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, `Port${port} Open:) `);
});