'use client';
import React, { useState } from 'react';

interface Props {
  user?: User;
}

export default function CardAvatar({ user }: Props) {
  const [imageError, setImageError] = useState(false);

  if (!user) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="card-avatar-container"
      key={user.id}
    >
      <p className="avatar-container">{user.name.charAt(0)}</p>
      {/* {!imageError ? (
        user.avatar === '' ? (
          <p className="avatar-container">{user.name.charAt(0)}</p>
        ) : (
          <img
            src={user.avatar}
            alt="Avatar"
            onError={handleImageError}
            key={user.id}
          />
        )
      ) : (
        <p className="avatar-container">{user.name.charAt(0)}</p>
      )} */}
    </div>
  );
}
