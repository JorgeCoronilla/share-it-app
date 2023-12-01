'use client';
import { useState } from 'react';
import IconPencilFill from './pencilIcon';
import IconUsers from './groups';

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
