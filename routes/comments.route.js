const express = require('express');
const { Posts, Comments } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// 댓글 생성
router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const { userId } = res.locals.user;

  if (Object.keys(req.body).length === 0) {
    return res.status(412).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }

  const post = await Posts.findByPk(postId);

  if (!post) {
    return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
  }

  try {
    await Comments.create({ comment, userId, postId });

    res.status(201).json({ message: '댓글을 작성하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 작성에 실패하였습니다.' });
    console.log('errorMessage: ' + error.message);
  }
});

// 댓글 목록 조회

// 댓글 수정

// 댓글 삭제

module.exports = router;
