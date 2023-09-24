import { useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContent';
import { useNavigate } from 'react-router-dom';

const UseRefreshToken = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.get('https://casualquestion.an.r.appspot.com/refresh');
      if (response.data && response.data.accessToken) {
        setUser(prev => ({ ...prev, accessToken: response.data.accessToken }));
        return response.data.accessToken;
      } else {
        console.error("新しいアクセストークンがレスポンスに含まれていません");
        navigate('/login');
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.error("トークンの更新に失敗しました", error);
      navigate('/login');
      throw error;
    }
  }, [setUser, navigate]);

  return refreshAccessToken;
};

export default UseRefreshToken;