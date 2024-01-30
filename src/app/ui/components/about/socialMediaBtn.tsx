import React from 'react';
import IconGithubLogo from '../global/iconsComponents/githubIcon';
import { IconLinkedinCircled } from '../global/iconsComponents/linkedinIcon';
import { IconGmail } from '../global/iconsComponents/gmailIcon';

export default function SocialMediaBtn() {
  return (
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
  );
}
