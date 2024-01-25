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
            <p className="normal-text">
              Do not forget what you paid, not forget to pay.
            </p>
          </div>
        </main>
      </section>
      {/* <section className="features">
        <h2>Crea grupos</h2>
        <img
          src={`/icons/actividad.webp`}
          className="home-img"
        />
      </section>
      <section className="features">
        <h2>Crea grupos</h2>
        <img
          src={`/icons/amigos.webp`}
          className="home-img"
        />
      </section>
      <section className="features">
        <h2>Crea grupos</h2>
        <img
          src={`/icons/nuevo-gasto.webp`}
          className="home-img"
        />
      </section> */}
    </>
  );
}
