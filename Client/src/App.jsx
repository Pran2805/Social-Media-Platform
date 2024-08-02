import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreatePost from './pages/CreatePost.jsx';


function App() {
  return (
      <Router>
          <div className="min-w-0 mx-auto">
              <nav className="bg-gray-800 p-4">
                  <ul className="flex space-x-4">
                      <li>
                          <Link to="/" className="text-white font-semibold text-md hover:text-blue-600">Home</Link>
                      </li>
                      <li>
                          <Link to="/create" className="text-white font-semibold text-md hover:text-blue-600">Create Post</Link>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/create" element={<CreatePost />} />
                  <Route path="/" element={<Home />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;