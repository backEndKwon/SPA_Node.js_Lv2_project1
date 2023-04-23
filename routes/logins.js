const express = require("express");
const router = express.Router();

const Users = require("../schemas/user");
const jwt = require("jsonwebtoken");

/* 2주차 과제 (3-1) 로그인(JWT추가) 세팅 */
/* (4) 로그인 API 구현 */
router.post('/login', async (req, res) => {

    try {
    const { nickname, password } = req.body;
    //nickname이 일치하는 유저를 찾기
    const user = await Users.findOne({ nickname });

    if (!user || user.password !== password) {
        res.status(412).json({
            errorMessage: "닉네임 또는 패스워드를 확인해주세요"
        });
        return;
    };
   
        //JWT 생성
        const token = jwt.sign({ nickname: user.nickname }, "kwon-secret-key");//userId에 user안에있는 userId를 할당할거다
        //JWT를 cookie로 할당
        res.cookie("Authorization", `Bearer ${token}`);
        //JWT(토큰)을 Body로 할당
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({
            errorMessage: "로그인에 실패하였습니다."
        });
    };
});

module.exports = router;