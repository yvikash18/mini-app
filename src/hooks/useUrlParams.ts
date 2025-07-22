import { useEffect, useState } from 'react';
import type { DealParams } from '@/types/deal';

export const useUrlParams = () => {
  const [params, setParams] = useState<DealParams>({
    username: '',
    dealPrice: '',
    commission: '',
    telegramId: '',
  });

  useEffect(() => {
    const extractParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const startAppParam = urlParams.get('startapp');
      
      if (startAppParam) {
        const [name, deal, comm, tgId] = startAppParam.split('-');
        setParams({
          username: name || '',
          dealPrice: deal || '',
          commission: comm || '',
          telegramId: tgId || '',
        });
      } else {
        // If no URL params, try to get data from Telegram WebApp
        const tg = window.Telegram?.WebApp;
        
        // Debug logging to check what's available
        console.log('Telegram WebApp object:', tg);
        console.log('initDataUnsafe:', tg?.initDataUnsafe);
        console.log('user data:', tg?.initDataUnsafe?.user);
        
        // Ensure Telegram WebApp is ready
        if (tg) {
          tg.ready();
        }
        
        const username = tg?.initDataUnsafe?.user?.username || 
                        tg?.initDataUnsafe?.user?.first_name || 
                        'demo_user';
        const userId = tg?.initDataUnsafe?.user?.id?.toString() || '123456789';
        
        console.log('Extracted username:', username);
        console.log('Extracted userId:', userId);
        
        setParams({
          username: username,
          dealPrice: '5.0', // Dummy deal price
          commission: '0.5', // Dummy commission
          telegramId: userId,
        });
      }
    };

    // Try to extract params immediately
    extractParams();

    // Also try again after a short delay in case Telegram WebApp loads asynchronously
    const timeoutId = setTimeout(() => {
      if (!params.username || params.username === 'demo_user') {
        extractParams();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return params;
};
