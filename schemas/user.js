/* 2주차 과제 (2-1) Schemas상의 user 세팅 */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
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