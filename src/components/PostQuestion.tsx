import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"

const PostQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  
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

  return (
    <div>
      <form onSubmit={ postData }>
        <textarea
        name="message"
        placeholder="write some message"
        value={message}
          onChange={handleChange}
         ></textarea>
        <button type="submit">質問を送る</button>
      </form>
    </div>
  )
}

export default PostQuestion;