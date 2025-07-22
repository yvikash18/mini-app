import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="tm-header">
      <div className="tm-header-logo">
        <a href="/" className="tm-logo">
          <i className="tm-logo-icon"></i>
          <i className="tm-logo-text"></i>
        </a>
      </div>
    </header>
  );
};
