import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

const Home: React.FC = () => {
  return <div>ホームページ</div>
}

const Signup: React.FC = () => {
  return <div>サインアップ</div>
}

const Login: React.FC = () => {
  return <div>ログイン</div>
}

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
