import { FC, useState, useRef, useEffect } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import './Header.css';

export const Header: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { balance, isLoading: balanceLoading } = useWalletBalance();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
    setShowDropdown(false);
  };

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="tm-header">
      <div className="tm-header-logo">
        <a href="/" className="tm-logo">
          <i className="tm-logo-icon"></i>
          <i className="tm-logo-text"></i>
        </a>
      </div>
      <div className="tm-header-actions tm-header-actions-thin">
        {wallet ? (
          // Show wallet info when connected
          <div className="wallet-status" ref={dropdownRef}>
            <div className="wallet-info">
              <div className="wallet-address">
                {wallet.account.address.slice(0, 10)}...{wallet.account.address.slice(-5)}
              </div>
              {!balanceLoading && (
                <div className="wallet-balance">
                  {balance} TON
                </div>
              )}
            </div>
            <button 
              className="disconnect-btn dropdown-arrow" 
              onClick={toggleDropdown}
              title="Wallet Options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="currentColor" fillRule="evenodd" d="M2.4 6.05a.75.75 0 0 1 1.05-.15L8 9.313 12.55 5.9a.75.75 0 0 1 .9 1.2l-5 3.75a.75.75 0 0 1-.9 0l-5-3.75a.75.75 0 0 1-.15-1.05" clipRule="evenodd"></path>
              </svg>
            </button>
            {showDropdown && (
              <div className="wallet-dropdown">
                <button className="dropdown-item" onClick={handleDisconnect}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M10.15 3h-.033c-1.092 0-1.958 0-2.655.057-.714.058-1.317.18-1.868.46a4.75 4.75 0 0 0-2.076 2.077c-.281.55-.403 1.154-.461 1.868C3 8.159 3 9.025 3 10.117v3.766c0 1.092 0 1.958.057 2.655.058.714.18 1.317.46 1.869a4.75 4.75 0 0 0 2.077 2.075c.55.281 1.154.403 1.868.461.697.057 1.563.057 2.655.057h3.133a.75.75 0 0 0 0-1.5h-3.1c-1.132 0-1.937 0-2.566-.052-.62-.05-1.005-.147-1.31-.302a3.25 3.25 0 0 1-1.42-1.42c-.155-.305-.251-.69-.302-1.31-.051-.63-.052-1.434-.052-2.566v-3.7c0-1.132 0-1.937.052-2.566.05-.62.147-1.005.302-1.31a3.25 3.25 0 0 1 1.42-1.42c.305-.155.69-.251 1.31-.302.63-.051 1.434-.052 2.566-.052h3.1a.75.75 0 0 0 0-1.5zm7.38 4.22a.75.75 0 1 0-1.06 1.06l2.97 2.97H8.75a.75.75 0 0 0 0 1.5h10.69l-2.97 2.97a.75.75 0 1 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06z" clipRule="evenodd"></path>
                  </svg>
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        ) : (
          // Show connect button when not connected
          <button 
            className="btn btn-primary tm-header-action tm-header-button ton-auth-link"
            onClick={handleConnect}
          >
            <i className="icon icon-connect-ton"></i>
            <span className="tm-button-label">Connect TON</span>
          </button>
        )}
      </div>
    </header>
  );
};
