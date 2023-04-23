/* 2주차 과제 (1) authmiddleware 세팅 */

//KEYWORD : JWT, TOKEN, BEARER, AUTHRIZATION

const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");

    if (authType !== "Bearer" || !authToken) {
        res.status(400).json({
            errorMessage: "로그인 후에 이용할 수 있는 기능입니다."
        });
        return;
    };
    //JWT검증
    try {
        const { userId } = jwt.verify(authToken, "kwon-secret-key")
        const user = await User.findOne({userId});

        res.locals.user = user //해당하는 user값을 locals.user에 넣는다.
        next(); //이 미들웨어 다음으로 보낸다.
    } catch (error) {
        console.error(error);

        res.status(400).json({
            errorMessage: "로그인 후에 이용할 수 있는 기능입니다."
        });
        return;
    };
};