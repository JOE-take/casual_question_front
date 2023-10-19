import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StringMappingType } from 'typescript';

const Signup: React.FC = () => {

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const [errMessage, seterrMessage] = useState("");

  const validateFormData = (formData: { userName: string, email: string, password: string }) => {

    // エラーの形式
    let errors: { userName?: string, email?: string, password?: string } = {};

    // userNameのValidation
    if (!formData.userName) {
      errors.userName = 'ユーザ名は必須です';
    }

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
    if (errors.userName || errors.email || errors.password) {
      seterrMessage('入力内容にエラーがあります');
      return;
    }
    try {
      const response = await axios.post('https://casualquestion.an.r.appspot.com/signup', formData);
      console.log(response.data)
      if (response.data && response.status === 200) {
        navigate('/login')
      }
    } catch (error) {
      console.log('failed to post data to API', error)
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 400:
            seterrMessage('サインアップできません。入力内容を見直してください。')
            break;
        }
      }
    }
  };

  return (
    <div className='form-container'>
      <h1>アカウント作成</h1>
      <p>{errMessage}</p>
      <form onSubmit={handlerSubmit}>
        name:<input type="text" name="user_name" onChange={handleChange} value={formData.userName} /><br />
        email:<input type="text" name="email" onChange={handleChange} value={formData.email} /><br />
        password:<input type="password" name="password" onChange={handleChange} value={formData.password} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup