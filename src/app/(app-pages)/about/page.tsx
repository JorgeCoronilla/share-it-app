import IconGithubLogo from '@/app/ui/dashboard/iconsComponents/githubIcon';
import { IconGmail } from '@/app/ui/dashboard/iconsComponents/gmailIcon';
import { IconLinkedinCircled } from '@/app/ui/dashboard/iconsComponents/linkedinIcon';
import SectionTitle from '@/app/ui/global/sectionTitle';

import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <>
      <div className="blur-stain-1"></div>
      <div className="blur-stain-2"></div>
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
      <main className="about-main">
        <div className="section-spacer"></div>
        <SectionTitle title="About" />

        <div className="section-spacer"></div>
        <p className="about-subtitle">Jorge Coronilla Naranjo </p>

        <div className="about-text-container">
          <p className="about-paragraph">Desarrollador front-end:</p>
          <div className="tags-container">
            <div>
              <p id="react">React</p>
            </div>
            <div>
              <p id="next">Next.js</p>
            </div>
            <div>
              <p id="typescript">Typescript</p>
            </div>
            <div>
              <p id="javascript">JS</p>
            </div>
            <div>
              <p id="node">Nodejs</p>
            </div>
            <div>
              <p id="webpack">Webpack</p>
            </div>
            <div>
              <p id="express">Express</p>
            </div>
            <div>
              <p id="mongodb">MongoDB</p>
            </div>
            <div>
              <p id="sql">SQL</p>
            </div>
            <div>
              <p id="access">Accesibilidad</p>
            </div>
          </div>

          <div className="about-spacer"></div>
        </div>
        <div className="about-container">
          <div className="about-icons">
            <a
              href="https://github.com/JorgeCoronilla"
              target="_blank"
            >
              <div>
                <IconGithubLogo />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/jorge-coronilla-naranjo-20019376/"
              target="_blank"
            >
              <div>
                <IconLinkedinCircled />
              </div>
            </a>
            <a
              href="mailto:jorge.coronilla.naranjo@gmail.com"
              target="_blank"
            >
              <div>
                <IconGmail />
              </div>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
