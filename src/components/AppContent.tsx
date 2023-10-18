import React, { useEffect, useState } from 'react';
import useRefreshToken from './UseRefreshToken';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./Home";
import Nav from './Nav';
import Signup from './Signup';
import Login from './Login';
import CreateChannel from './CreateChannel';
import Channel from './Channel';
import Loading from './Loading';
import PostQuestion from './PostQuestion';

function AppContent() {
  const refreshAccessToken = useRefreshToken();
  const [refreshCompleted, setRefreshCompleted] = useState(false);

  useEffect(() => {
    async function refreshAndSetComplete() {
      await refreshAccessToken();
      setRefreshCompleted(true);
    }
    refreshAndSetComplete();
  }, [refreshAccessToken]);

  if (!refreshCompleted) {
    return <Loading />
  }

  return (
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
  );
}

export default AppContent;