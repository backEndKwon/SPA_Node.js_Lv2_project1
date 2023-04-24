//각각의 ROUTER들을 app.js가 아닌 index.js에서 정리하여 app.js로 송부가능

const express = require("express");
const router = express.Router();


const postsRouter = require("./posts.js");
const usersRouter = require("./users.js")
const loginsRouter = require("./logins.js");
const commentsRouter = require("./comments.js");

router.use("/", [postsRouter,usersRouter,loginsRouter,commentsRouter]);

module.exports = router;