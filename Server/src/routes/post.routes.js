import express from 'express';
import multer from 'multer';
import {
    getPost,
    createPost,
    likePost,
    commentPost
} from '../controller/post.controller.js';
import {upload} from "../middleware/multer.middleware.js"

const router = express.Router();


router.post('/posts', upload.single('file'), createPost);
router.post('/posts/like/:postId', likePost);
router.post('/posts/comment/:postId', commentPost);
router.get('/posts', getPost);

export default router;