const express = require("express");
const router = express.Router();

const Users = require("../schemas/user");
const jwt = require("jsonwebtoken");

/* 로그인 API 구현(JWT 세팅) */
router.post('/login', async (req, res) => {

    try {
        const { nickname, password } = req.body;
        const user = await Users.findOne({ nickname });

        if (!user || user.password !== password) {
            res.status(412).json({
                errorMessage: "닉네임 또는 패스워드를 확인해주세요"
            });
            return;
        };
        //JWT 생성
        const token = jwt.sign({ nickname: user.nickname }, "kwon-secret-key");
        
        res.cookie("Authorization", `Bearer ${token}`,{ httpOnly: true, maxAge: 30000 });//JWT를 cookie로 할당
        res.status(200).json({ token });//JWT(토큰)을 Body로 할당

    } catch (err) {
        res.status(400).json({
            errorMessage: "로그인에 실패하였습니다."
        });
    };
});

module.exports = router;