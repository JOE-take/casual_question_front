import React, { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContent';
import UseRefreshToken from './UseRefreshToken';

const CreateChannel: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const refreshAccessToken = UseRefreshToken();

  const createChannel = useCallback(async () => {
    try {
      console.log(user)
      const response = await axios.post('http://localhost:8080/channel/new', { owner: user.userId }, {
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
        await refreshAccessToken();
        createChannel();
      }
      console.error(error);
    }
  }, [navigate, user, refreshAccessToken]);

  return (
    <div>
      <button onClick={createChannel}>新しいChannelを作成</button>
    </div>
  );
}

export default CreateChannel;