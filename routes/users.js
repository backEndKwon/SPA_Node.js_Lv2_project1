const express = require("express");
const router = express.Router();
const Users = require("../schemas/user");

/*   회원가입 API 구현   */
router.post("/signup", async (req, res) => {
    const { nickname, password, confirm } = req.body;

    //닉네임 타입 조건 검사
    try {
        const checkNickname = /^[a-zA-Z0-9]{3,}$/.test(nickname);
        if (!checkNickname) {
            res.status(412).json({
                errorMessage: "닉네임의 형식이 올바르지 않습니다.",
            });
            return;
        };
        //닉네임 기데이터 중복 검사
        const existsUsers = await Users.findOne({ nickname });
        if (existsUsers) {
            res.status(412).json({
                errorMessage: "중복된 닉네임입니다.",
            });
            return;
        };
        //패스워드 일치 검사
        if (password !== confirm) {
            res.status(412).json({
                errorMessage: "패스워드가 일치하지 않습니다."
            });
            return;
        };
        //패스워드 길이 검사(4자이상)
        if (password.length < 4) {
            res.status(412).json({
                errorMessage: "패스워드 형식이 일치하지 않습니다."
            });
            return;
        };
        //패스워드에 닉네임 포함 검사
        if (password.includes(nickname)) {
            res.status(412).json({
                errorMessage: "패스워드에 닉네임이 포함되어있습니다."
            });
            return;
        };
        //정상실행
        const user = new Users({ nickname, password });
        // console.log(user) //{nickname: 'devel',password: '12384',_id: new ObjectId("6444e6b4bd29603ab6585771")}
        await user.save();
        res.status(201).json({
            message: "회원가입에 성공하였습니다."
        });
        return;
   
    } catch (err) {
        res.status(400).json({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    };
});

module.exports = router;