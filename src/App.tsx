import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
        
        <Switch>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
