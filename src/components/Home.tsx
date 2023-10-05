import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [id, setId] = useState<String>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${id}`)
  }

  return (
    <div className='home'>
      <h1>Casual Question へようこそ！</h1>
      <form onSubmit={handleSubmit}>
        IDを入力して質問チャンネルへ:
        <input type="text" name="email" onChange={handleChange} />
      </form>
      <Link to="/channel/new" className='link'>新しいチャンネルの作成</Link>
    </div>
  )
}

export default Home