import ThemeSwitcher from './ui/global/themeSwitcher';

export default function Home() {
  return (
    <main>
      <div className="blur-stain-1"></div>
      <div className="blur-stain-2"></div>
      <div className="flex flex-col items-center justify-center pt-80 pb-10 px-10">
        <h1 className="title">Share-it</h1>
        <p className="normal-text mt-10">
          Do not forget what you paid, not forget to pay.
        </p>
      </div>
      <ThemeSwitcher pageClass="home" />
    </main>
  );
}
