import { FC } from 'react';
import { FRAGMENT_LINKS } from '@/constants/links';

export const Footer: FC = () => {
  return (
    <footer className="tm-footer">
      <div className="tm-footer-links">
        <a href={FRAGMENT_LINKS.TOP_AUCTIONS} className="tm-footer-link">
          Top Auctions
        </a>
        <a href={FRAGMENT_LINKS.ABOUT} className="tm-footer-link">
          About
        </a>
        <a href={FRAGMENT_LINKS.TERMS} className="tm-footer-link">
          Terms
        </a>
        <a href={FRAGMENT_LINKS.PRIVACY} className="tm-footer-link">
          Privacy
        </a>
      </div>
    </footer>
  );
};
