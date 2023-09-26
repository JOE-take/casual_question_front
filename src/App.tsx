import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContent';
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Channel from './components/Channel';
import CreateChannel from './components/CreateChannel';
import PostQuestion from './components/PostQuestion';
import Nav from './components/Nav'
import { useUser } from './components/UserContent';
import './App.css';

axios.defaults.withCredentials = true;



function App() {

  return (
    <UserProvider>
      <Router>
        <div>
          <Nav />
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