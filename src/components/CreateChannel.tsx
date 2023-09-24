import React, { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContent';

const CreateChannel: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const createChannel = useCallback(async () => {
    try {
      console.log(user)
      const response = await axios.post('http://localhost:8080/channel/new', {owner: user.userId});
      const channelID = response.data.id;
      if (channelID) {
        navigate(`/channel/${channelID}`);
      } else {
        console.error("idがレスポンスに含まれていません");
      }
    } catch (error) {
      console.error("Channelの作成中にエラーが発生しました:", error);
    }
  }, [navigate]);

  return (
    <div>
      <button onClick={createChannel}>新しいChannelを作成</button>
    </div>
  );
}

export default CreateChannel;