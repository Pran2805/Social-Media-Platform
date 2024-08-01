import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFile, setNewFile] = useState(null);

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("content", newContent);
    formData.append("file", newFile);

    axios
      .post("http://localhost:8000/api/posts", formData)
      .then((response) => {
        setNewTitle("");
        setNewContent("");
        setNewFile(null);
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <div className="max-w-2xl mx-auto mt-8 p-6 border border-gray-300 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(event) => setNewTitle(event.target.value)}
          value={newTitle}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <textarea
          name="content"
          placeholder="Content"
          onChange={(event) => setNewContent(event.target.value)}
          value={newContent}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        ></textarea>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default CreatePost;
  