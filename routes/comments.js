
const express = require("express");
const router = express.Router();
//뒤의 express에 있는 라우터 함수의 값을 router에 선언

//스케마 comments.js에서 가져온 정보를 Comments에 담기
const Comments = require("../schemas/comments.js");
const Posts = require("../schemas/posts.js");

//// 구조 총 9개 ////
//// 게시글 : 작성, 조회, 상세조회, 수정, 삭제 
////   댓글 : 생성, 조회, 수정, 삭제

/////////////////////    (6)   댓글 생성 api       /////////////////////
///구성 : post방식
router.post('/posts/:_postId/comments', async (req, res) => {

    const { _postId } = req.params;
    const { user, password, content } = req.body;

    try {
        if (!user || !password) {
            return res.status(404).json({
                message: "데이터 형식이 올바르지 않습니다(user,password) "
            });
        }
        if (!content) {
            return res.status(404).json({
                message: "댓글 내용을 입력해주세요."
            });
        }

    }
    catch (err) {
        return res.status(404).json({
            message: "데이터 형식이 올바르지 않습니다(catch) ."
        });
    }
    let createdAt = Date.now()
    await Comments.create({
        postId: _postId,
        user,
        password,
        content,
        createdAt,
    })
    res.json({
        message: "댓글을 생성하였습니다."
    });
});
////////////////////////////////////////////////////////////////////////


/////////////////////    (7)   댓글 목록조회 api       /////////////////
///구성 : get방식 //id,user,content, 0time
router.get("/posts/:_postId/comments", async (req, res) => {
  try {
      const { _postId } = req.params;
      //시간순으로 정렬해서 목록 조회
      const comments = await Comments.find({});

      const result = comments.map((data) => {
          return {
              commentId: data._id,
              user: data.user,
              content: data.content,
              createdAt: data.createdAt
          };
      });
      res.status(200).json({ data: result });

  } catch (err) {
      return res.status(400).json({
          message: "데이터 형식이 올바르지 않습니다."
      });
  };
});
////////////////////////////////////////////////////////////////////////


/////////////////////    (8)   댓글 수정 api       /////////////////
router.put("/posts/:_postId/comments/:_commentId", async (req, res) => {
  try {
      const {_commentId} = req.params
      
      const { password , content } = req.body;
      const existComment = await Comments.find({ _id : _commentId, password });    

      if (content == ""){ 
          return res.status(400).json({ message: "댓글을 입력해주세요" });
      }
      if (existComment.length) {
          await Comments.updateOne(
              { _id : _commentId, password }, 
              { $set: { content : content}});
          return res.status(200).json({message : "댓글 수정완료되었습니다."});
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
router.delete("/posts/:_postId/comments/:_commentId", async (req, res) => {
    try {
        const { password } = req.body;
        const {_commentId} = req.params;
        const commentlist = await Comments.find({ _id: _commentId, password });

        if (commentlist.length) {
            await Comments.deleteOne({ _id: _commentId });
        } else {
            return res.status(400).json({ message: "비밀번호가 다릅니다." });
        }
        res.status(200).json({ message: "댓글을 삭제하였습니다." })
    } catch (err) { // 그 외에 에러들은 에러메세지 반환
        return res.status(400).json({
            message: "댓글 조회에 실패하였습니다."
        });
    };
});
////////////////////////////////////////////////////////////////////////

// //마무리 내보내기
module.exports = router;
