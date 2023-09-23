import React from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Channel from './components/Channel';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">ホーム</Link> | <Link to="/signup">サインアップ</Link> | <Link to="/login">ログイン</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/channel/:id" element={<Channel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;