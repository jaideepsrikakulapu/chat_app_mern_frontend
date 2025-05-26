import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import { useUser } from '../context/UserProvider';
import axios from 'axios';
import defaultAvatar from '../assets/default-avatar.png'; // fallback image

const Sidebar = ({ onUserSelect, onlineUsers, currentChat, searchQuery, setSearchQuery }) => {
  const socket = useSocket();
  const { user, setUser } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [profileImagePreview, setProfileImagePreview] = useState(user?.profilePhoto || defaultAvatar);

  // Get all users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        const otherUsers = res.data.filter(u => u._id !== user._id);
        setAllUsers(otherUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [user]);

  // Upload profile photo
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(`/api/users/${user._id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const newPhotoUrl = res.data.profilePhoto;
      setUser(prev => ({ ...prev, profilePhoto: newPhotoUrl }));
      setProfileImagePreview(newPhotoUrl);
    } catch (err) {
      console.error('Error uploading photo:', err);
    }
  };

  // Filter users by search
  const filteredUsers = allUsers.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-800 text-white h-screen p-4 flex flex-col">
      
      {/* User Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="relative cursor-pointer">
          <img
            src={profileImagePreview}
            alt="Your Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            className="absolute opacity-0 w-full h-full top-0 left-0"
          />
        </label>
        <div>
          <div className="text-lg font-semibold">{user.username}</div>
          <div className="text-sm text-green-400">Online</div>
        </div>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-4 px-3 py-2 rounded bg-gray-700 text-white outline-none"
      />

      {/* User List */}
      <div className="overflow-y-auto space-y-2">
        {filteredUsers.map(u => {
          const isOnline = onlineUsers.includes(u._id);
          const isSelected = currentChat?._id === u._id;

          return (
            <div
              key={u._id}
              onClick={() => onUserSelect(u)}
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                isSelected ? 'bg-gray-700' : ''
              }`}
            >
              <img
                src={u.profilePhoto || defaultAvatar}
                alt={u.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{u.username}</div>
                <div className={`text-xs ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
