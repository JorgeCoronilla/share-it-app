import AboutHeader from '@/app/ui/components/about/aboutHeader';
import SocialMediaBtn from '@/app/ui/components/about/socialMediaBtn';
import Tags from '@/app/ui/components/about/tags';
import BgStains from '@/app/ui/components/global/bgStains';
import SectionTitle from '@/app/ui/components/global/sectionTitle';
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
