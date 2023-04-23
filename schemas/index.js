/* INDEX 세팅 */
const mongoose = require("mongoose");

// (2) mongoDB 연결
const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test_post")
    .catch(err => console.log(err));
};

// (3) 에러 발생시 메세지 반환
mongoose.connection.on("error", err => {
  console.error("MongoDB Connect Error", err);
});

// (4) 연결

module.exports = connect;