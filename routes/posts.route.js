const express = require('express');
const { Posts } = require('../models');
const { Users } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// 게시글 작성
router.post('/posts', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { userId } = res.locals.user;

  // 객체의 key를 배열로 반환해서 객체 요소 존재 확인
  if (Object.keys(req.body).length === 0) {
    return res.status(412).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  } else if (title === '') {
    return res.status(412).json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
  } else if (content === '') {
    return res.status(412).json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
  }

  try {
    await Posts.create({ title, content, userId });
    res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    console.log('errorMessage: ' + error.message);
  }
});

// 게시글 조회
router.get('/posts', async (_, res) => {
  try {
    const posts = await Posts.findAll({
      // 응답할 속성들
      attributes: ['postId', 'userId', 'title', 'createdAt', 'updatedAt'],
      // join할 테이블과 별명, 응답할 속성
      include: [{ model: Users, as: 'user', attributes: ['nickname'] }],
      // createdAt 기준으로 나열
      order: [['createdAt', 'desc']],
    });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ errorMessage: '게시물 조회에 실패하였습니다.' });
    console.log('errorMessage: ' + error.message);
  }
});

// 게시글 상세 조회
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Posts.findOne({
      attributes: ['postId', 'userId', 'title', 'content', 'createdAt', 'updatedAt'],
      include: [{ model: Users, as: 'user', attributes: ['nickname'] }],
      where: { postId },
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ errorMessage: '게시물 조회에 실패하였습니다.' });
    console.log('errorMessage: ' + error.message);
  }
});

// 게시글 수정

// 게시글 삭제

module.exports = router;
