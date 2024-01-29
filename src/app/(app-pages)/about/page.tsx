import AboutHeader from '@/app/ui/about/aboutHeader';
import SocialMediaBtn from '@/app/ui/about/socialMediaBtn';
import Tags from '@/app/ui/about/tags';
import IconGithubLogo from '@/app/ui/dashboard/iconsComponents/githubIcon';
import { IconGmail } from '@/app/ui/dashboard/iconsComponents/gmailIcon';
import { IconLinkedinCircled } from '@/app/ui/dashboard/iconsComponents/linkedinIcon';
import BgStains from '@/app/ui/global/bgStains';
import SectionTitle from '@/app/ui/global/sectionTitle';

import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <>
      <BgStains />
      <AboutHeader />
      <main className="about-main">
        <div className="section-spacer"></div>
        <SectionTitle title="About" />

        <div>
          <p className="about-subtitle">Jorge Coronilla Naranjo </p>
        </div>
        <p className="about-paragraph">Desarrollador front-end</p>

        <Tags />
        <div className="about-spacer"></div>

        <div className="about-container">
          <SocialMediaBtn />
        </div>
      </main>
    </>
  );
}
