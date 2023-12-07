'use client';
import { useState } from 'react';
import IconUsers from '../iconsComponents/groupsIcon';

export default function AddGroupButton() {
  const [display, setDisplay] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setDisplay(!display);
  };
  return (
    <button className="add-button group">
      <div>
        <IconUsers />+
      </div>
    </button>
  );
}
