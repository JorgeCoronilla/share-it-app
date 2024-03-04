'use client';

import { useEffect, useState } from 'react';

interface ThemeSwitcherProps {
  pageClass?: string;
}

export default function ThemeSwitcher({ pageClass = '' }: ThemeSwitcherProps) {
  const [lightTheme, setLightTheme] = useState(false);
  //Sets browser configuration
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    setLightTheme(darkModeMediaQuery.matches);
  }, []);

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
        aria-labelledby="switcher-label"
      />
      <label
        htmlFor="darkmode-toggle"
        className="toggle"
        id="switcher-label"
      >
        <span>Toggle dark mode</span>
      </label>
    </div>
  );
}
