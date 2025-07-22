import { FC } from 'react';

export const KYCInfo: FC = () => {
  return (
    <div className="tm-section-box tm-section-buttons">
      <button className="btn btn-primary js-place-bid-btn">
        <span className="tm-button-label">
          You do not need to complete KYC verification,
          as the buyer is a verified merchant on Fragment with a 💎10,000 deposit.
        </span>
      </button>
    </div>
  );
};
