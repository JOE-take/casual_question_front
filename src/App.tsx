import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
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
          <Link to={`${process.env.PUBLIC_URL}/`}>ホーム</Link> | <Link to={`${process.env.PUBLIC_URL}/signup`}>サインアップ</Link> | <Link to={`${process.env.PUBLIC_URL}/login`}>ログイン</Link>
          <Link to={`${process.env.PUBLIC_URL}/channel/123`}>tesuto</Link>
        </nav>
        
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>} />
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Signup/>} />
          <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login/>} />
          <Route path={`${process.env.PUBLIC_URL}/channel/:id`} element={<Channel/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
