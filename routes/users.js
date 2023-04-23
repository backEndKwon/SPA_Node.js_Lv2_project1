/* 회원가입 API 구현 */
const express = require("express");
const router = express.Router();

const Users = require("../schemas/user");

/*   회원가입 API 구현   */

router.post("/signup", async (req, res) => {
    const { nickname, password, confirm } = req.body;
    //닉네임 검사 : a,A,0이루어진것, 닉네임 중복, 비번에 닉네임포함, 비번 2개 일치여부, 그외 오류

    //닉네임 조건 검사
    const checkNickname = /^[a-zA-Z0-9]{3,}$/.test(nickname);
    if (!checkNickname) {
        res.status(412).json({
            errorMessage: "닉네임의 형식이 올바르지 않습니다.",
        })
        return;
    };
    //닉네임 기데이터 중복 검사
    const existsUsers = await Users.findOne({ nickname });
    if (existsUsers) {
        res.status(412).json({
            errorMessage: "이미 존재하는 닉네임 입니다.",
        });
        return;
    };
    //패스워드 일치 검사
    if (password !== confirm) {
        res.status(412).json({
            errorMessage: "패스워드를 다시 확인하십시오."
        });
        return;
    };
    //패스워드 길이 검사(4자이상)
    if (password.length < 4) {
        res.status(412).json({
            errorMessage: "패스워드는 4글자 이상이여야 합니다.."
        })
        return;
    }
    //패스워드에 닉네임 포함 검사
    if (password.includes(nickname)) {
        res.status(412).json({
            errorMessage: "패스워드에 닉네임이 포함되어있습니다."
        });
        return;
    }
    // try { //정상적으로 모두 진행되었을때
        const user = new Users({ nickname, password });
        // console.log(user) //{nickname: 'devel',password: '12384',_id: new ObjectId("6444e6b4bd29603ab6585771")}
        await user.save();
        res.status(201).json({ message: "회원가입에 성공하였습니다." });
        return;
    // } catch (err) {
    //     res.status(400).json({
    //         errorMessage: "요청한 데이터형식이 올바르지 않습니다.",
    //     });
    // }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;