const express = require('express');
const { checkBlacklistToken } = require('../middlewares/blacklistToken.middleware');
const { authenticate } = require('../middlewares/verifyJWT.middleware');
const postComment = require('../controllers/comment/postComment.controller');
const { softDeleteComment, deleteComment } = require('../controllers/comment/deleteComment.controller');
const adminOnly = require('../middlewares/admin.middleware');
const getCommentsByBlogId = require('../controllers/comment/getCommentsByBlog.controller');
const userSuspendMiddleware = require('../middlewares/userSuspend.middleware');

const router = express.Router();

//post comment
router.post('/post-comment/:blogId', checkBlacklistToken, authenticate,userSuspendMiddleware, postComment);
//soft delete comment
router.put('/soft-delete-comment/:commentId', checkBlacklistToken, authenticate,userSuspendMiddleware, softDeleteComment);
//permanently delete comment (admin only)
router.delete('/delete-comment/:commentId', checkBlacklistToken, authenticate, adminOnly,userSuspendMiddleware, deleteComment);
//get comments by blog id
router.get('/get-comments/:blogId', getCommentsByBlogId)






module.exports = router;

