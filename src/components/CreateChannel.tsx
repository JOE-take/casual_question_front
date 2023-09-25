import React, { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContent';
import UseRefreshToken from './UseRefreshToken';

const CreateChannel: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const refreshAccessToken = UseRefreshToken();

  const createChannel = useCallback(async (retryCount = 0) => {
    try {
      console.log(user)
      const response = await axios.post('https://casualquestion.an.r.appspot.com/channel/new', { owner: user.userId }, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      const channelID = response.data.id;
      if (channelID) {
        navigate(`/channel/${channelID}`);
      } else {
        console.error("idがレスポンスに含まれていません");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        if (retryCount < 3) {
          await refreshAccessToken();
          createChannel(retryCount + 1);
        } else {
          console.error(error)
        }
      }
    }
  }, [navigate, user, refreshAccessToken]);

  const handleCreateChannelClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // 必要に応じてデフォルトの動作を防ぐ
    createChannel(); // 非同期関数を呼び出す
  };

  return (
    <div>
      <button onClick={handleCreateChannelClick}>新しいChannelを作成</button>
    </div>
  );
}

export default CreateChannel;