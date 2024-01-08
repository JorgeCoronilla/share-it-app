import Hero from './ui/home/hero';
import HomeHeader from './ui/home/homeHeader';
export default function Home() {
  return (
    <div className="home-body">
      <HomeHeader />
      <div className="blur-stain-1"></div>
      <div className="blur-stain-2"></div>
      <main>
        <Hero />
      </main>
    </div>
  );
}
