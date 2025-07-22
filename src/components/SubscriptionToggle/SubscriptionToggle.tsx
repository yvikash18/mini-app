import { FC } from 'react';

interface SubscriptionToggleProps {
  subscribed: boolean;
  onToggle: () => void;
}

export const SubscriptionToggle: FC<SubscriptionToggleProps> = ({ 
  subscribed, 
  onToggle 
}) => {
  return (
    <div className="tm-section-subscribe tm-section-box">
      <a
        className="btn-link"
        onClick={onToggle}
        role="button"
        style={{ cursor: 'pointer', display: 'inline-block' }}
      >
        {subscribed ? 'Unsubscribe from updates' : 'Subscribe to updates'}
      </a>
    </div>
  );
};
