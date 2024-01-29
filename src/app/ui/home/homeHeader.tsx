'use client';
import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from '../global/themeSwitcher';
function HomeHeader() {
  return (
    <div>
      <header className="home-header">
        <div className="home-links">
          <Link href="/login">SignIn</Link>
          <Link href="/register">SignUp</Link>
        </div>
        <div className="home-links">
          <Link href="/about">About</Link>
        </div>
      </header>
    </div>
  );
}

export default HomeHeader;
