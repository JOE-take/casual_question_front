import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">ホーム</Link> | <Link to="/signup">サインアップ</Link> | <Link to="/login">ログイン</Link>
        </nav>
        
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
