import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfile } from '../../api/user';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      setProfile(response.user);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full mb-4 border-4 border-gray-200 shadow bg-gray-200 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-24 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    );
  }

  const user = profile || authUser;
  const avatarUrl = user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`;

  return (
    <div className="flex flex-col items-center">
      <img
        src={avatarUrl}
        alt="Profile Avatar"
        className="w-20 h-20 rounded-full mb-4 border-4 border-gray-200 shadow"
      />
      <div className="font-bold text-lg">{user?.firstName} {user?.lastName}</div>
      <div className="text-gray-500 capitalize">{user?.role || 'Worker'}</div>
      {user?.department && (
        <div className="text-gray-400 text-sm">{user.department}</div>
      )}
    </div>
  );
};

export default Profile; 