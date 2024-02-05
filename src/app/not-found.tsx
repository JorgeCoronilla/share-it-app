import React from 'react';
import './globals.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <p>Ooops! The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="submit-button "
      >
        Take me home
      </Link>
    </div>
  );
}
