
const express = require("express");
const app = express();
const port = 3000;

const commentsRouter = require("./routes/comments.js");
const postsRouter = require("./routes/posts.js");
const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js")
const loginsRouter = require("./routes/logins.js");

const connect = require("./schemas");
const cookieParser = require("cookie-parser");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//urlendcoded : FormData를 받을 수 있도록 하는 기능
app.use(cookieParser());
//전역 미들웨어에 cookieParser 등록
app.use("/", [postsRouter, indexRouter, commentsRouter, usersRouter, loginsRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, `Port${port} Open:) `);
});