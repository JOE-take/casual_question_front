import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom"

const PostQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const postData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://casualquestion.an.r.appspot.com/channel/${id}/post`, {
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.log("Error Posting data:", error);
    }
  }

  // 最初の処理
  const channelExistence = async () => {
    try {
      const response = await axios.post(`https://casualquestion.an.r.appspot.com/channel/${id}/exist`);
      switch (response.status) {
        case 200:
          setStatusMsg('質問を送りましょう！');
          break;
        case 400:
          setStatusMsg('サーバーエラー');
          break;
        case 404:
          navigate('/')
          break;
      }
    } catch (error) {
      console.log("Error Posting data:", error);
    }
  }
  
  useEffect(() => {
    channelExistence();
  }, []);

  return (
    <div>
      <form onSubmit={postData}>
        <textarea
          name="message"
          placeholder="write some message"
          value={message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">質問を送る</button>
      </form>
      <p>{statusMsg}</p>
    </div>
  )
}

export default PostQuestion;