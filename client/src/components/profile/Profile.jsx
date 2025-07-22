import React from 'react';

const mockUser = {
  name: 'John Doe',
  role: 'Software Engineer',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
};

const Profile = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={mockUser.avatar}
        alt="Profile Avatar"
        className="w-20 h-20 rounded-full mb-4 border-4 border-gray-200 shadow"
      />
      <div className="font-bold text-lg">{mockUser.name}</div>
      <div className="text-gray-500">{mockUser.role}</div>
    </div>
  );
};

export default Profile; 