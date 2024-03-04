import Link from 'next/link';
import ThemeSwitcher from '../ui/components/global/themeSwitcher';
import HomeHeader from '../ui/components/home/homeHeader';
export default function Home() {
  return (
    <>
      <section className="home-body">
        <HomeHeader />
        <ThemeSwitcher pageClass="home" />
        <div
          role="presentation"
          className="blur-stain-1"
        ></div>
        <div
          role="presentation"
          className="blur-stain-2"
        ></div>
        <main>
          <div className="hero-container">
            <h1 className="title">Share-it</h1>
            <p className="banner">
              Las cuentas compartidas de manera <span>simple.</span>
            </p>
            <Link
              href="/register"
              className="join-button"
            >
              Regístrate gratis
            </Link>
          </div>
          <div className="steps-container">
            <div>
              <p>1</p>
              <h2>Crea un grupo</h2>
            </div>
            <div>
              <p>2</p>
              <h2>Invita a los participantes</h2>
            </div>
            <div>
              <p>3</p>
              <h2>Añade los gastos</h2>
            </div>
          </div>
          <footer className="footer">
            <p>
              Hecho con<span>❤</span> por <span>Jorge Coronilla Naranjo</span>
            </p>
          </footer>
        </main>
      </section>
    </>
  );
}
