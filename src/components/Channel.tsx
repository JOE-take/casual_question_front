import React from 'react';
import { useParams } from 'react-router-dom';

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Channel: {id}</h1>
			<p>{id}</p>
    </div>
  );
}

export default Channel;