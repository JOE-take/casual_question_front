import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContent';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://casualquestion.an.r.appspot.com/login', formData, {
      });
      if (response.data && response.data.accessToken) {
        setUser({
          userName: response.data.userName,
          userId: response.data.userId,
          accessToken: response.data.accessToken 
          })
      }
    } catch (error) {
      console.log('failed to post data to API', error)
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handlerSubmit}>
        email:<input type="text" name="email" onChange={handleChange} /><br />
        password:<input type="password" name="password" onChange={handleChange} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login