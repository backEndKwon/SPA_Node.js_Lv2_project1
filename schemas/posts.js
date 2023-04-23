
// (1) mongoose가져오기
const mongoose = require("mongoose");

// (2) 게시글에 올라갈 내용들의 타입 구성 세팅
const postsSchema = new mongoose.Schema(
    {
       
        userId: {
            type: mongoose.Types.ObjectId,
            requried: true,
            ref : "User"
        },
         nickname: {
            type: String,
            ref : "User"
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now

        },
    },
    {
        versionKey: false,
    } ///__v나오는거 삭제해줌
);
postsSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});

postsSchema.set("toJSON", {
    virtuals: true,
});
// (3) postsSchema를 Posts라는 이름에 담아 폴더 전역에서 쓸수있게 세팅
module.exports = mongoose.model("Posts", postsSchema);