import React from 'react';
import * as RiIcons from "react-icons/ri";
import { SocialLink } from './SocialLink';
import { NavButton } from '../header/NavButton';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-zinc-900 py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center gap-8">
          <NavButton label="GRIMOIRE" to="/grimoire" locked={false} />
          <SocialLink
            icon={RiIcons.RiTwitterXLine}
            label="Twitter"
            href="https://x.com/suisnails/"
          />
          <SocialLink
            icon={RiIcons.RiDiscordLine}
            label="Discord"
            href="https://discord.com"
            locked={true}
          />
          <SocialLink
            icon={RiIcons.RiGithubLine}
            label="Github"
            href="https://github.com"
            locked={true}
          />
        </div>
        <p className="text-center text-xs text-zinc-600 font-mono mt-4">
          [ACCESS_RESTRICTED] :: AWAIT_FURTHER_INSTRUCTIONS
        </p>
      </div>
    </footer>
  );
};
