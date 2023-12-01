'use client';
import { useState } from 'react';
import IconPencilFill from './pencilIcon';

export default function AddExpenseButton() {
  const [display, setDisplay] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setDisplay(!display);
  };
  return (
    <button className="add-button expense">
      <div>
        <IconPencilFill />+
      </div>
    </button>
  );
}
