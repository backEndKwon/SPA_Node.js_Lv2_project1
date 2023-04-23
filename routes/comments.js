/* 댓글 API 구현 */
const express = require("express");
const router = express.Router();

const Comments = require("../schemas/comments.js");
const Posts = require("../schemas/posts.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

/////////////////////    (6)   댓글 생성 api       /////////////////////
router.post('/posts/:_postId/comments', authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { _postId } = req.params;
    const { comment } = req.body;
    const existPost = await Posts.findOne({ userId, _id: _postId });
    try {
        if (!existPost) {
            res.status(403).json({ errorMessage: "게시글이 존재하지 않습니다." })
            return;
        } else {
            if (!comment) {
                res.status(404).json({ errorMessage: "내용을 작성해주세요" })
            }
        }
    
        let createdcomments = await Comments.create({
            userId,
            comment,
            // nickname,// 대체 왜  닉네임이 정의가 안되었다고 나오는거지..?
            createdAt : Date.now(),
        })
        console.log(createdcomments)
        res.status(201).json({
            message: "댓글을 작성하였습니다."
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "댓글 작성에 실패하였습니다."
        });
    }
});
////////////////////////////////////////////////////////////////////////


/////////////////////    (7)   댓글 목록조회 api       /////////////////
router.get("/posts/:_postId/comments", authMiddleware ,async (req, res) => {
    try {
        const {userId} = res.locals.user;
        const { _postId } = req.params;
        //시간순으로 정렬해서 목록 조회

        const comments = await Comments.find({userId}).sort({createdAt : -1});
        
        const result = comments.map((data) => {
            return {
                commentId: data._id,
                userId: data.userId,
                nickname : data.nickname,//닉네임이 왜안나와 ㅠㅠㅠ
                comment: data.comment,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });
        res.status(200).json({ comments: result });

    } catch (err) {
        return res.status(400).json({
            message: "댓글 조회에 실패하였습니다.."
        });
    };
});
////////////////////////////////////////////////////////////////////////


/////////////////////    (8)   댓글 수정 api       /////////////////
router.put("/posts/:_postId/comments/:_commentId", authMiddleware, async (req, res) => {
    try {
        const {userId} = res.locals.user;
        const { _commentId } = req.params

        const {comment} = req.body;
        const existComment = await Comments.find({ userId, _id: _commentId});
        if (!userId) {
            return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
        }
        if (comment.length == 0) {
            return res.status(400).json({ message: "댓글을 입력해주세요" });
        }
        if (existComment.length) {
            await Comments.updateOne(
                { userId, _id: _commentId },
                { $set: { comment } });
            return res.status(200).json({ message: "댓글을 수정하였습니다.." });
        } else {
            return res.status(400).json({ message: "댓글 조회에 실패하였습니다." });
        }
    } catch (err) {
        return res.status(400).json({
            message: "데이터 형식이 올바르지 않습니다."
        });
    };
});
// // ////////////////////////////////////////////////////////////////////////


// /////////////////////    (9)   댓글 삭제 api       /////////////////////
// ///구성 :delete방식
router.delete("/posts/:_postId/comments/:_commentId", authMiddleware, async (req, res) => {
    try {
        const {userId} = res.locals.user;
        const { _commentId } = req.params;
        const commentlist = await Comments.find({ userId, _id: _commentId});
        if (commentlist.length) {
            await Comments.deleteOne({ userId, _id: _commentId });
        } else {
            return res.status(403).json({ errorMessage: "댓글의 삭제권한이 존재하지 않습니다." });
        }
        res.status(200).json({ message: "댓글을 삭제하였습니다." })
    } catch (err) { // 그 외에 에러들은 에러메세지 반환
        return res.status(400).json({
            message: "댓글 삭제에 실패하였습니다."
        });
    };
});
////////////////////////////////////////////////////////////////////////

// //마무리 내보내기
module.exports = router;
