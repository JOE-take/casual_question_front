import React, { useState } from 'react';
import axios from 'axios';

const Signup: React.FC = () => {
  
    const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  });
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value}));
  };
  
  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://casualquestion.an.r.appspot.com/signup', formData);
      console.log(response.data)
    } catch (error) {
      console.log('failed to post data to API', error)
    }
  };

  return (
    <div>
      <h1>サインアップ</h1>
      <form onSubmit={handlerSubmit}>
        name:<input type="text" name="user_name" onChange={handleChange}/><br/>
        email:<input type="text" name="email" onChange={handleChange}/><br/>
        password:<input type="password" name="password" onChange={handleChange}/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup