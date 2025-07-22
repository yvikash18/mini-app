import { FC } from 'react';

interface UserInfoProps {
  username: string;
}

export const UserInfo: FC<UserInfoProps> = ({ username }) => {
  return (
    <div className="tm-list tm-section-box tm-section-auction-info">
      <dl className="tm-list-item">
        <dt>Telegram Username</dt>
        <dd>
          <span className="accent-color">@{username}</span>
        </dd>
      </dl>
      <dl className="tm-list-item">
        <dt>Web Address</dt>
        <dd>
          <span className="accent-color">t.me/{username}</span>
        </dd>
      </dl>
      <dl className="tm-list-item">
        <dt>TON Web 3.0 Address</dt>
        <dd>
          <span className="accent-color">
            <span className="tm-web3-address">
              <span className="subdomain">{username}</span>
              <span className="domain">.t.me</span>
            </span>
          </span>
        </dd>
      </dl>
    </div>
  );
};
