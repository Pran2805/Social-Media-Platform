import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        file: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleFileChange = (event) => {
        setNewPost({ ...newPost, file: event.target.files[0] });
    };

    const handlePostSubmit = () => {
        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("content", newPost.content);
        formData.append("file", newPost.file);

        axios
            .post("http://localhost:8000/api/posts", formData)
            .then((response) => {
                setNewPost({ title: "", content: "", file: null });
            })
            .catch((error) => console.error("Error creating post:", error));
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 border border-gray-300 bg-white shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Post</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPost.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mb-4"
            />
            <textarea
                name="content"
                placeholder="Content"
                value={newPost.content}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mb-4"
            ></textarea>
            <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded mb-4"
            />
            <button
                onClick={handlePostSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
                Post
            </button>
        </div>
    );
}

export default CreatePost;
