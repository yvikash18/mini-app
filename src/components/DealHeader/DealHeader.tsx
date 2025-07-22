import { FC } from 'react';

interface DealHeaderProps {
  username: string;
}

export const DealHeader: FC<DealHeaderProps> = ({ username }) => {
  return (
    <div className="tm-section-header">
      <h2 className="tm-section-header-text">
        <span className="tm-section-header-domain">
          <span className="tm-web3-address">
            <span className="subdomain">{username || 'monkreturn'}</span>
            <span className="domain">.t.me</span>
          </span>
        </span>
        <span className="tm-section-header-status tm-status-avail">
          Deal In Progress
        </span>
      </h2>
    </div>
  );
};
