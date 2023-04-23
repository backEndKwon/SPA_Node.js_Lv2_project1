/* 댓글 타입 세팅 */
const mongoose = require("mongoose");

// (2) 댓글에 올라갈 내용들의 타입 세팅 
const commentsSchema = new mongoose.Schema({
  //댓글(comment)과 게시물(post)의 연결고리 = _postId  
  userId: {
    type: mongoose.Types.ObjectId,
            requried: true,
            ref : "Posts"
  },
  comment: {
    type: String,
    required: true

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},
  {
    versionKey: false
  });

commentsSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

commentsSchema.set("toJSON", {
  virtuals: true,
});

// (3) 폴더 전역에 Comment사용 가능하게 끔 exports
module.exports = mongoose.model("Comments", commentsSchema);