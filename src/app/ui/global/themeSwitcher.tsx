'use client';

import { useState } from 'react';

interface ThemeSwitcherProps {
  pageClass?: string;
}

export default function ThemeSwitcher({ pageClass = '' }: ThemeSwitcherProps) {
  const [lightTheme, setLightTheme] = useState(false);
  const handleSwitchTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightTheme(!lightTheme);
    const root = document.body;
    root.classList.add(e.target.checked ? 'dark' : 'light');
    root.classList.remove(e.target.checked ? 'light' : 'dark');
  };
  return (
    <div className={`switcher-container ${pageClass}`}>
      <input
        checked={lightTheme}
        type="checkbox"
        className="sr-only"
        id="darkmode-toggle"
        onChange={handleSwitchTheme}
      />
      <label
        htmlFor="darkmode-toggle"
        className="toggle"
      >
        <span>Toggle dark mode</span>
      </label>
    </div>
  );
}
