import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim()) {
      navigate(`/video-call/${roomId}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Join a Video Call</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinPage;
