const mongoose = require("mongoose");

/* 댓글 타입 세팅 */
const commentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      requried: true,
      ref: "Posts"
    },
    comment: {
      type: String,
      required: true

    },
    // createdAt: {type: Date,default: Date.now},
    // updatedAt: {type: Date,default: Date.now}
  },
  {
    timestamps: true
  },
  {
    versionKey: false //_v삭제
  });

commentsSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});
commentsSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Comments", commentsSchema);