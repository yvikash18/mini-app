import { useState } from 'react';

export const useSubscription = () => {
  const [subscribed, setSubscribed] = useState(() => 
    localStorage.getItem('isSubscribed') === 'true'
  );

  const toggleSubscription = () => {
    const newState = !subscribed;
    setSubscribed(newState);
    localStorage.setItem('isSubscribed', newState.toString());
  };

  return {
    subscribed,
    toggleSubscription,
  };
};
