import { FC } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { Page } from '@/components/Page.tsx';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { DealHeader } from '@/components/DealHeader/DealHeader';
import { DealInfoTable } from '@/components/DealInfoTable/DealInfoTable';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { ConnectButton } from '@/components/ConnectButton/ConnectButton';
import { SubscriptionToggle } from '@/components/SubscriptionToggle/SubscriptionToggle';
import { KYCInfo } from '@/components/KYCInfo/KYCInfo';
import { TradeInfoTable } from '@/components/TradeInfoTable/TradeInfoTable';
import { useUrlParams } from '@/hooks/useUrlParams';
import { useSubscription } from '@/hooks/useSubscription';
import './FragmentPage.css';

export const FragmentPage: FC = () => {
  const wallet = useTonWallet();
  const { username, dealPrice, commission, telegramId } = useUrlParams();
  const { subscribed, toggleSubscription } = useSubscription();

  // Keep this for debugging purposes
  console.log(telegramId, wallet);

  // TODO: Implement transaction functionality
  // const handleSend = async () => {
  //   if (!wallet) return;
  //   await tonConnectUI.sendTransaction({
  //     validUntil: Math.floor(Date.now() / 1000) + 600,
  //     messages: [
  //       {
  //         address: 'EQCxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with receiver address
  //         amount: tonToNanotons(dealPrice),
  //       },
  //     ],
  //   });
  // };

  return (

      <div id="aj_content">
        <Header />
        
        <main className="tm-main js-main-content">
          <section className="tm-section tm-auction-section">
            <DealHeader username={username} />
            <DealInfoTable dealPrice={dealPrice} commission={commission} />
            <UserInfo username={username} />
            <ConnectButton />
            <SubscriptionToggle 
              subscribed={subscribed} 
              onToggle={toggleSubscription} 
            />
            <KYCInfo />
          </section>
          
          <TradeInfoTable />
        </main>

        <Footer />
      </div>
  
  );
};
