const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware.js");
const Posts = require("../schemas/posts.js");
const Users = require("../schemas/user.js");

/*         week1 (1)   게시글 작성 api             */
/*         week2 (1)   게시글 작성 api             */
//조건 : 유효토큰만 게시물 작성. 제목/작성내용 입력//
router.post("/posts", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    try {
        if (!req.body) {
            res.status(412).json({
                errorMessage: "데이터 형식이 올바르지 않습니다."
            });
            return;
        };
        if (title.length === 0) {
            res.status(412).json({
                errorMessage: "게시글 제목의 형식이 올바르지 않습니다."
            });
            return;
        };
        if (content.length === 0) {
            res.status(412).json({
                errorMessage: "게시글 내용의 형식이 올바르지 않습니다."
            });
            return;
        };
        if (!userId) {
            res.status(403).json({
                errorMessage: "전달된 쿠키에서 오류가 발생하였습니다."
            });
            return;
        };

        const createdAt = new Date;
        await Posts.create({ userId, title, content, createdAt });
        res.status(201).json({ message: "게시글을 생성하였습니다." });

    } catch (err) {
        return res.status(400).json({
            errorMessage: "게시글 작성에 실패하였습니다."
        })
    }
});
////////////////////////////////////////////////////////////////////////


/////////////////////   (2)   게시글 조회 api       ////////////////////
///구성 : get방식/ data[id,user,title, time]
router.get('/posts', authMiddleware, async (req, res) => {
    //Posts에 있는 모든데이터를 posts로 선언
    try {
       
        const posts = await Posts.find({});

        
            const result = posts.map((data) => {

                return {
                    postId: data._id,
                    userId: data.userId,
                    nickname: Users.nickname,
                    title: data.title,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                };
            });
        
        //게시글 구성 = data [값, 값]
        res.status(200).json({ posts: result });
    } catch (err) {
        res.status(400).json({
            errorMessage: "게시글 조회에 실패하였습니다."
        })
    }

});
////////////////////////////////////////////////////////////////////////


//////////////////   (3)   게시글 상세조회 api       ///////////////////
///구성 : get방식/ postid 길이 24자 / content까지
router.get('/posts/:_postId', async (req, res) => {
try{
    const { _postId } = req.params;
    const postdetail = await Posts.findOne({ _id: _postId }).select("-password -__v");
    // console.log(postdetail)
    if (!postdetail) {
        return res.status(400).json({
            message: "데이터형식이 올바르지 않습니다."
        })
    } res.status(200).json({ "post": {
        postId : postdetail.postId,
        userId : postdetail.userId,
        nickname : postdetail.nickname, ///닉네임이 호출이 안됨... 상세조회회
        title : postdetail.title,
        content : postdetail.content,
        createdAt : postdetail.createdAt,
        updatedAt : postdetail.updatedAt,
    } })
}catch(err){
    res.status(400).json({errorMessage : '게시글 조회에 실패하였습니다.'});
}

});
////////////////////////////////////////////////////////////////////////


/////////////////////    (4)   게시글 수정 api       ///////////////////
///구성 : put방식 , password, title, content
///게시글을 수정한다 = content를 수정한다
router.put("/posts/:_postId", async (req, res) => {

    const { _postId } = req.params //params이용해서 postid객체분할로 가져오기
    const { content } = req.body //content만 수정할거기때문에
    // let setId = _postId;
    const existPost = await Posts.findById(_postId)

    try {
        if (existPost) {
            await Posts.updateOne({ _id: _postId }, { $set: { content } });
            res.status(200).json({ message: "게시글을 수정하였습니다." });
        } else {
            return res.status(400).json({ message: "게시글 조회에 실패하였습니다." });
        }
    } catch (err) {
        return res.status(400).json({
            message: "데이터 형식이 올바르지 않습니다."
        });
    };

});
//////////////////////////////////////////////////////////////////////////


/////////////////////    (5)   게시글 삭제 api       /////////////////////
///구성 : delete방식 
router.delete('/posts/:_postId', async (req, res) => {
    const { _postId } = req.params;
    const { password } = req.body;
    const postlist = await Posts.findById(_postId);
    //이미 주소 자체가 해당 아이디 하나로 고정정
    //아이디가 있어야 삭제할게 있으니까
    if (postlist) {
        //아이디는 있는데 비번이 틀ㄹ
        if (postlist.password !== password) {
            return res.status(400).json({ message: "데이터 형식(비밀번호)이 올바르지 않습니다." })
        } else {
            await Posts.deleteOne({ _id: _postId });
            return res.status(200).json({ message: "게시글을 삭제하였습니다." })
        }
    } else {
        return res.status(400).json({ message: "게시글 조회에 실패하였습니다." })
    }
});



module.exports = router;