import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [commentInput, setCommentInput] = useState("");

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/posts")
            .then((response) => {
                setPosts(response.data.data)
                console.table(response.data.data)
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const handleLike = (postId) => {
        axios
            .post(`http://localhost:8000/api/posts/like/${postId}`)
            .then((response) => {
                const updatedPosts = posts.map((post) =>{
                    post._id === postId ? response.data: post
                });
                setPosts(updatedPosts);
                console.table(posts)
            })
            .catch((error) => console.error("Error liking post:", error));
    };

    const handleAddComment = (postId, commentText) => {
        axios
            .post(`http://localhost:8000/api/posts/comment/${postId}`, {
                text: commentText,
            })
            .then((response) => {
                const updatedPosts = posts.map((post) =>{
                    post._id === postId ? response.data: post
                });
                setPosts(updatedPosts);
            })
            .catch((error) => console.error("Error adding comment:", error));
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
            {Array.isArray(posts) && posts?.map((post) => (

                <div key={post._id} className="border border-gray-300 p-4 mb-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600">{post.content}</p>

                    {post.file && (
                        <div className="mt-4">
                            {post.file.includes(".mp4") ? (
                                <video width="320" height="240" controls>
                                    <source
                                        src={`http://localhost:8000/uploads/${post.file}`}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={`http://localhost:8000/uploads/${post.file}`}
                                    alt="Post Media"
                                    className="w-full h-auto"
                                />
                            )}
                        </div>
                    )}
                    <p className="mt-4 text-gray-700">Likes: {post.likes}</p>
                    <button
                        onClick={() => handleLike(post._id)}
                        className="bg-green-500 text-white py-2 px-4 mt-2 rounded hover:bg-green-600"
                    >
                        Like
                    </button>
                    <p className="mt-4 text-gray-700">Comments: {post.comments.length}</p>
                    <ul className="list-none mt-2 pl-0">
                        {post.comments.map((comment, index) => (
                            <li key={index} className="mb-1 text-gray-700">{comment.text}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="mt-4 p-2 w-3/4 border border-gray-300 rounded"
                        onChange={(e) => setCommentInput(e.target.value)}
                        value={commentInput}
                    />
                    <button
                        onClick={() => handleAddComment(post._id, commentInput)}
                        className="bg-green-500 text-white py-2 px-4 mt-2 rounded hover:bg-green-600 ml-2"
                    >
                        Add Comment
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Home;
