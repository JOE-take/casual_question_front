import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContent';
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Channel from './components/Channel';
import CreateChannel from './components/CreateChannel';
import PostQuestion from './components/PostQuestion';
import { useUser } from './components/UserContent';
import './App.css';

axios.defaults.withCredentials = true;
function App() {
  const { user } = useUser();
  const drawNav = () => {
    if (user && user.userId && user.userName && user.accessToken) {
      return (
        <div>
          <nav>
            <Link to="/">ホーム</Link>
            | <Link to="/channel/new">部屋の作成</Link>
          </nav>
        </div>
      )
    }
    return (
      <div>
        <nav>
          <Link to="/">ホーム</Link>
          | <Link to="/signup">サインアップ</Link>
          | <Link to="/login">ログイン</Link>
        </nav>
      </div>
    )
  }

  return (
    <UserProvider>
      <Router>
        <div>
          drawNav();
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="channel/new" element={<CreateChannel />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/:id" element={<PostQuestion />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;