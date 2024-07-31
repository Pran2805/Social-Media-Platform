import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreatePost from './pages/CreatePost.jsx';

function App() {


  return (
    <>
      <Router>
        <div className="app">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Post</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>

    </>
  )
}

export default App
