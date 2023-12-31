import { useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContent';
import { NavigateFunction } from 'react-router';

const UseRefreshToken = () => {
  const { user, setUser } = useUser();

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.get('https://casualquestion.an.r.appspot.com/refresh');
      if (response.data && response.data.accessToken) {
        const newUser = user;
        user.accessToken = response.data.accessToken;
        setUser(newUser);
        return;

      } else {
        console.error("新しいアクセストークンがレスポンスに含まれていません");
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.error("トークンの更新に失敗しました", error);
      throw error;
    }
  }, [setUser]);

  return refreshAccessToken;
};

export default UseRefreshToken;