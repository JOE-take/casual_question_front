import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Channel: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [data, setData] = useState<any | null>(null);

	const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/channel/${id}`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
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