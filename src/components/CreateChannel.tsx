import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContent';
import UseRefreshToken from './UseRefreshToken';
import QRCodeComponent from './QRCode';

const CreateChannel: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const refreshAccessToken = UseRefreshToken();
  const [channelID, setChannnelID] = useState("");

  const baseURL = "https://joe-take.github.io/casual_question_front/#/";

  const createChannel = useCallback(async (retryCount: number) => {
    try {
      console.log(user)
      const response = await axios.post('https://casualquestion.an.r.appspot.com/channel/new', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      if (response.data.id) {
        setChannnelID(response.data.id);
      } else {
        console.error("idがレスポンスに含まれていません");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        if (retryCount < 2) {
          await refreshAccessToken();
          createChannel(retryCount + 1);
        } else {
          navigate('/login')
          console.error(error)
        }
      }
    }
  }, [navigate, user, refreshAccessToken]);

  const handleCreateChannelClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    createChannel(0);
  };

  const redirectToPage = () => {
    navigate(`/channel/${channelID}`)
  }

  return (
    <div>
      {channelID
        ? <div className='channel-info'>
          IDは {channelID} です。
          <div className='qr-component'>
            <QRCodeComponent url={`${baseURL}${channelID}`} />
          </div>
          URL: {`${baseURL}${channelID}`}
          <br /><button className='url-text' onClick={redirectToPage}>質問を見る</button>
        </div>
        : <button className='button' onClick={handleCreateChannelClick}>新しいChannelを作成</button>
      }
    </div>
  );
}

export default CreateChannel;