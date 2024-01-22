'use client';
import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from '../global/themeSwitcher';
function HomeHeader() {
  return (
    <div>
      <header>
        <div className="home-links">
          <Link href="/login">SignIn</Link>
          <Link href="/register">SignUp</Link>
        </div>
        {/* <ThemeSwitcher pageClass="home" /> */}
      </header>
    </div>
  );
}

export default HomeHeader;
