import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContent';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useUser();
  const navigate = useNavigate();
  const [errMessage, seterrMessage] = useState("");

  const validateFormData = (formData: {email: string, password: string }) => {

    // エラーの形式
    let errors: {email?: string, password?: string } = {};

    // emailのValidation
    if (!formData.email) {
      errors.email = 'Emailは必須です';
    } else if (!/\S+@\S+.\S+/.test(formData.email)) {
      errors.email = '有効なメールアドレスを入力してください';
    }

    // passwordのValidation
    if (!formData.password) {
      errors.password = 'パスワードは必須です';
    } else if (formData.password.length < 6) {
      errors.password = 'パスワードは6文字以上である必要があります';
    }

    return errors;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    if (errors.email || errors.password) {
      seterrMessage('入力内容にエラーがあります');
      return;
    }
    try {
      const response = await axios.post('https://casualquestion.an.r.appspot.com/login', formData, {
      });
      if (response.data && response.data.accessToken) {
        setUser({
          userName: response.data.userName,
          userId: response.data.userId,
          accessToken: response.data.accessToken
        })
        navigate('/')
      }
    } catch (error) {
      console.log('failed to post data to API', error)
      if (axios.isAxiosError(error) && error.response) {
        seterrMessage('ログインできません。内容を見直してください。')
        setFormData({
          email: '',
          password: '',
        });
      }
      return
    }
  };

  return (
    <div className='form-container'>
      <h1>ログイン</h1>
      <p>{errMessage}</p>
      <form onSubmit={handlerSubmit}>
        email:<input type="text" name="email" onChange={handleChange} value={formData.email} /><br />
        password:<input type="password" name="password" onChange={handleChange} value={formData.password} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login