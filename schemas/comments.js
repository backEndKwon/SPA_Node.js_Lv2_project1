
// (1) mongoose가져오기
const mongoose = require("mongoose");

// (2) 댓글에 올라갈 내용들의 타입 세팅 
const commentsSchema = new mongoose.Schema({
  //댓글(comment)과 게시물(post)의 연결고리 = _postId  
  _postId: {
    type: String,
    requried: true,
  },
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// (3) 폴더 전역에 Comment사용 가능하게 끔 exports
module.exports = mongoose.model("Comments", commentsSchema);