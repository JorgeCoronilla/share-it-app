'use client';
import { useState } from 'react';
import IconHamburgerMenu from './hamburger';
import DropDown from './dropdown';

export default function Header() {
  const [display, setDisplay] = useState(false);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setDisplay(!display);
  };
  return (
    <>
      <div className="header-container">
        <h1
          className="text-right text-2xl mt-1
        font-black bg-gradient-to-r from-cyan-100 via-indigo-400 to-pink-400 
        inline-block text-transparent bg-clip-text"
        >
          Share-it
        </h1>
        <div className="user-container">
          <p className="user-name">Jorge</p>
          <div className="avatar-container">J</div>
        </div>
      </div>
    </>
  );
}
