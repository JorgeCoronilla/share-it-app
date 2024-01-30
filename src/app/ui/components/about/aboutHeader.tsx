import Link from 'next/link';
import React from 'react';

export default function AboutHeader() {
  return (
    <div>
      <header className="about-header">
        <div className="home-links">
          <Link href="/login">SignIn</Link>
          <Link href="/register">SignUp</Link>
        </div>
        <div className="home-links">
          <Link href="/">Home</Link>
        </div>
      </header>
    </div>
  );
}
