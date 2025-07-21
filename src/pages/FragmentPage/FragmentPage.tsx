
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import './FragmentPage.css';

export const FragmentPage: FC = () => {
  return (
    <Page back={true}>
      <div id="aj_content">
  <header className="tm-header">
    <div className="tm-header-logo">
      <a href="/" className="tm-logo js-header-logo js-logo js-random-logo js-logo-hoverable">
        <i className="tm-logo-icon js-logo-icon"></i>
        <i className="tm-logo-text"></i>
      </a>
    </div>
 
    <div className="tm-header-menu hide js-header-menu" data-close-outside="js-header-menu-window">
      <div className="tm-header-menu-close-button js-header-menu-close-button icon-before icon-header-menu-close"></div>
      <div className="tm-header-menu-window js-header-menu-window">
        <div className="tm-header-menu-body">
          <h4 className="tm-menu-subheader">Platform</h4>
          <div className="tm-menu-links">
            <a href="/about" className="tm-menu-link icon-before icon-menu-about">About</a>
            <a href="/terms" className="tm-menu-link icon-before icon-menu-terms">Terms</a>
            <a href="/privacy" className="tm-menu-link icon-before icon-menu-privacy">Privacy Policy</a>
          </div>
          <div className="tm-header-menu-footer">
            <div className="tm-header-menu-footer-text">
              Connect TON<br />to view your bids and assets
            </div>
            <button className="btn btn-primary btn-block tm-menu-button ton-auth-link">
              <i className="icon icon-connect-ton"></i>
              <span className="tm-button-label">Connect TON</span>
            </button>
            <div className="tm-menu-tg-account">
              <div className="tm-menu-tg-account-body">
                <span className="tm-menu-tg-account-photo">
                  <img src="https://cdn5.telesco.pe/file/OEiNdTqPEY3DguxNW8re6imGRQbRMkSHbzqG_aVqP6B78YbL6eBQC-fA93Vuy8GbezTQp_VaPLoolIXZocyl3SfXFSb1Tv4jfZnFxutdM94iVhFv5nV6EguNvVGEWb0lF4BRGh7pZ0xdWqc7Lhi0yTnfbGgrhchxx3AIg8t36mokktAnrmnNJ7TfEo_KLf2IMiSl3n1oe6BX9isDBIimCG9yDqM3hac0NUox0_5XkYy3q90tFZR0R0tO8DpfPih7XKhKCfRo42KDXRxuowQGnwhZsW_AJXiTlpJND0aOsoF1ENuRBfp1HE_Xnr5aBvbu67llynSut89QRNhWm0ZUIw.jpg" alt="Profile" />
                </span>
                <div className="tm-menu-tg-account-name">Gustavi</div>
                <div className="tm-menu-tg-account-desc">Telegram Account</div>
              </div>
              <a href="javascript:;" className="btn-link tm-menu-tg-account-logout logout-link">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <main className="tm-main js-main-content">
    <section className="tm-section tm-auction-section">
      <div className="tm-section-header">
        <h2 className="tm-section-header-text">
          <span className="tm-section-header-domain"><span className="tm-web3-address"><span className="subdomain">monkreturn</span><span className="domain">.t.me</span></span></span>
          <span className="tm-section-header-status tm-status-avail">Deal In Progress</span>
        </h2>
        <div className="tm-section-subscribe tm-section-box js-subscribe">
          <a className="btn-link subscribe-btn js-subscribe-btn">Subscribe to updates</a>
          <a className="btn-link unsubscribe-btn js-unsubscribe-btn">Unsubscribe from updates</a>
        </div>
      </div>
      
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
      <td>
        <div className="table-cell table-cell-oneline table-cell-wide">
          <div className="table-cell-value tm-value icon-before icon-ton">1,000</div>
          <div className="table-cell-desc">&nbsp;~&nbsp;$3,367</div>
        </div>
      </td>

      <td>
        <div className="table-cell table-cell-oneline table-cell-wide">
          <div className="table-cell-value tm-value icon-before icon-ton">200</div>
          <div className="table-cell-desc">&nbsp;~&nbsp;$674</div>
        </div>
      </td>
    </tr>
  </tbody>
        </table>
        <div className="tm-bid-info-text"></div>
      </div>
      
      <div className="tm-list tm-section-box tm-section-auction-info">
        <dl className="tm-list-item">
          <dt className="tm-list-item-title">Telegram Username</dt>
          <dd className="tm-list-item-value">
            <span className="accent-color">@monkreturn</span>
          </dd>
        </dl>
        <dl className="tm-list-item">
          <dt className="tm-list-item-title">Web Address</dt>
          <dd className="tm-list-item-value">
            <span className="accent-color">t.me/monkreturn</span>
          </dd>
        </dl>
        <dl className="tm-list-item">
          <dt className="tm-list-item-title">TON Web 3.0 Address</dt>
          <dd className="tm-list-item-value">
            <span className="accent-color"><span className="tm-web3-address"><span className="subdomain">monkreturn</span><span className="domain">.t.me</span></span></span>
          </dd>
        </dl>
      </div>
      
      <div className="tm-section-box tm-section-buttons">
        <button className="btn btn-primary js-place-bid-btn" data-bid-amount="1000">
          <span className="tm-button-label">Place bid and start auction</span>
        </button>
      </div>
      
      <div className="tm-section-subscribe tm-section-box js-subscribe">
        <a className="btn-link subscribe-btn js-subscribe-btn">Subscribe to updates</a>
        <a className="btn-link unsubscribe-btn js-unsubscribe-btn">Unsubscribe from updates</a>
      </div>
      <div className="tm-section-box tm-section-buttons">
        <button className="btn btn-primary js-place-bid-btn" data-bid-amount="1000">
          <span className="tm-button-label">You do not need to complete KYC verification,
as the buyer is a verified merchant on a Fragment
that has a security deposit of 💎10,000.</span>
        </button>
      </div>
      
      
    </section>
    <h4>Trade Info</h4>
    <div className="tm-section-box tm-section-bid-info">
        <table className="table tm-table tm-table-fixed">
          <thead>
            <tr>
              <th>Deal Status</th>
              <th>Username status</th>
              <th>Buyer</th>
            </tr>
          </thead>
          <tbody>
    <tr>
      <td>
        <div className="table-cell table-cell-oneline table-cell-wide">
          <div className="table-cell-value tm-value">Deal in Progress</div>
        </div>
      </td>

      <td>
        <div className="table-cell table-cell-oneline table-cell-wide">
          <div className="table-cell-desc">Swappable</div>
        </div>
      </td>
      <td>
        <div className="table-cell table-cell-oneline table-cell-wide">
           <a
            href="https://tonviewer.com/Ef_BbsF16B4aReCFhXIOLh7qgIdLTClPvKU29ZWwLShisZ6P"
            target="_blank"
            rel="noopener noreferrer"
            className="table-cell-desc">
            Ef_BbsF16B4aReCFhXI...
            </a>
        </div>
      </td>
    </tr>
  </tbody>
        </table>
        <div className="tm-bid-info-text"></div>
      </div>
  </main>
  
  
  {/* Additional popup containers would continue here */}
  
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
