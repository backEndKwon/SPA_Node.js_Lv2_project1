/* 2주차 과제 (1) authmiddleware 세팅 */

require('dotenv').config();
//KEYWORD : JWT, TOKEN, BEARER, AUTHRIZATION

const jwt = require("jsonwebtoken");
const User = require("../schemas/user");


module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");

    if (authType !== "Bearer" || !authToken) {
        res.status(400).json({
            errorMessage: "전달된 쿠키에서 오류가 발생하였습니다."
        });
        return;
    };
    //JWT검증
    try {
        const { userId } = jwt.verify(authToken, process.env.DB_KEY)//환경변수사용
        const user = await User.findOne({userId});

        res.locals.user = user //해당하는 user값을 locals.user에 넣는다.
        next(); //이 미들웨어 다음으로 보낸다.
    } catch (error) {
        console.error(error);

        res.status(400).json({
            errorMessage: "전달된 쿠키에서 오류가 발생하였습니다."
        });
        return;
    };
};