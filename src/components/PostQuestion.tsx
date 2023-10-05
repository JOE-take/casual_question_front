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
      const response = await axios.get(`https://casualquestion.an.r.appspot.com/channel/${id}/exist`);
      setStatusMsg('質問を送りましょう！');
    } catch (error) {
      console.log("Error Posting data:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.log("error response", error.response)
        switch (error.response.status) {
          case 400:
            setStatusMsg('数分後にもう一度試してください');
            break;
          default:
            navigate('/')
            break;
        }
      }
    }
  }

  useEffect(() => {
    channelExistence();
  }, []);

  return (
    <div className="post-question">
      <h1>質問を送りましょう！</h1>
      <form onSubmit={postData}>
        <textarea
          name="message"
          placeholder="write some message"
          value={message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">送信</button>
      </form>
      <p>{statusMsg}</p>
    </div>
  )
}

export default PostQuestion;