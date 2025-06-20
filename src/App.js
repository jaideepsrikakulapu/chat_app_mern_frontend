import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import VideoCall from './components/videocall';
import JoinCallPage from './pages/JoinCall';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend API base URL from environment variable or fallback
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Verify user token on app load
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Token verification failed:', err?.response?.data || err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [API_BASE_URL]);

  // Logout handler
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={user ? <Navigate to="/chat" replace /> : <LoginPage setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/chat" replace /> : <RegisterPage setUser={setUser} />}
        />

        {/* Protected routes */}
        <Route
          path="/chat"
          element={user ? <ChatPage user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/join-call"
          element={user ? <JoinCallPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/video-call/:roomId"
          element={user ? <VideoCallWrapper user={user} /> : <Navigate to="/" replace />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={user ? "/chat" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

// Wrapper to extract roomId param and pass to VideoCall component
function VideoCallWrapper({ user }) {
  const { roomId } = useParams();

  if (!roomId) return <Navigate to="/join-call" replace />;
  if (!user) return <Navigate to="/" replace />;

  return <VideoCall roomId={roomId} user={user} />;
}

export default App;
