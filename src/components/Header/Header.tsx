import { FC } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import './Header.css';

export const Header: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { balance, isLoading: balanceLoading } = useWalletBalance();

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

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
          <div className="wallet-status">
            <div className="wallet-info">
              <div className="wallet-address">
                {wallet.account.address.slice(0, 6)}...
              </div>
              {!balanceLoading && (
                <div className="wallet-balance">
                  {balance} TON
                </div>
              )}
            </div>
            <button 
              className="disconnect-btn" 
              onClick={handleDisconnect}
              title="Disconnect Wallet"
            >
              ×
            </button>
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
