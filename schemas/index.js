/* INDEX 세팅 */
const mongoose = require("mongoose");

// (1) mongoDB 연결
const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test_mall")
    .catch(err => console.log(err));
};

// (2) 에러 발생시 메세지 반환
mongoose.connection.on("error", err => {
  console.error("MongoDB Connect Error", err);
});

module.exports = connect;