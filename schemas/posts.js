const mongoose = require("mongoose");

/* 게시글 타입 세팅 */
const postsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            requried: true,
            ref: "User"
        },
        nickname: {
            type: String,
            ref: "User"
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        // createdAt: {type: Date,default: Date.now},
        // updatedAt: {type: Date,default: Date.now}
    },
    {
        timestamps: true
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

module.exports = mongoose.model("Posts", postsSchema);