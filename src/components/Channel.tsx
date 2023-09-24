import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContent';
import UseRefreshToken from './UseRefreshToken';

const Channel: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [data, setData] = useState<any | null>(null);
	const { user } = useUser();
  const refreshAccessToken = UseRefreshToken();

	const fetchData = async () => {
		try {
			const response = await axios.get(`https://casualquestion.an.r.appspot.com/channel/${id}`, {
				headers: {
					'Authorization': `Bearer ${user.accessToken}`
				}
			});
			setData(response.data);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        await refreshAccessToken();
				fetchData();
			}
			console.error(error);
		}
	}

	const formatDate = (isoDate: string) => {
		const date = new Date(isoDate);
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		return `${month}/${day} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	const renderContent = () => {
		if (data && data.length > 0) {
			return data.map((question: any) => (
				<div key={question.ID}>
					{formatDate(question.CreatedAt)}: {question.Content}
				</div>
			));
		} else {
			return <div>まだ質問が来てないようです...</div>;
		}
	}

	return (
		<div>
			<button onClick={fetchData}>質問を取得</button>
			{renderContent()}
		</div>
	);
}

export default Channel;