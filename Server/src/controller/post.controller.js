import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import mongoose from "mongoose";

const getPost = asyncHandler(async(req, res)=>{
    const posts = await Post.find();
    res.status(200).json(
        new ApiResponse(201, posts, "post response")
    )
})

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const file = req.file ? req.file.filename : undefined

    if (!title || !content) {
        throw new ApiError(400, "Title and Contents are required")
    }

    const post = new Post({ title, content, file });
    await post.save();

    res.status(200).json(
        new ApiResponse(200, post, "Post is added")
    )
})

const likePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, 'Post not found')
    }

    post.likes += 1;
        await post.save();

        res.status(200).json(
            new ApiResponse(201, post, 'post is liked')
        )
})

const commentPost = asyncHandler(async(req, res)=>{
    const postId = req.params.postId;
        const { text } = req.body;
        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, 'Post not found')
        }
        post.comments.push({ text });
        await post.save();

        res.status(200).json(
            new ApiResponse(201, post, 'comment')
        )
})

export {
    getPost,
    createPost,
    likePost,
    commentPost
}