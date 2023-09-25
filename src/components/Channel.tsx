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

		// JSTとしての日付・時間を取得
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
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