const mongoose = require("mongoose");

/* 회원가입 타입 세팅 */
const UserSchema = new mongoose.Schema(
    { 
    nickname: {
        type: String,
        required: true,
        required: true,
    },
    password: {
        type: String,
        required: true,                         
    }
});

UserSchema.virtual("userId").get(function () {
    return this._id.toHexString();
});
UserSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("User", UserSchema)