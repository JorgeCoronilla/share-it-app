import Link from 'next/link';
import ThemeSwitcher from '../ui/global/themeSwitcher';
import Hero from '../ui/home/hero';
import HomeHeader from '../ui/home/homeHeader';
export default function Home() {
  return (
    <>
      <section className="home-body">
        <HomeHeader />
        <ThemeSwitcher pageClass="home" />
        <div className="blur-stain-1"></div>
        <div className="blur-stain-2"></div>
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
              <h5>Crea un grupo</h5>
            </div>
            <div>
              <p>2</p>
              <h5>Invita a los participantes</h5>
            </div>
            <div>
              <p>3</p>
              <h5>Añade los gastos</h5>
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
