import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { App } from '@/components/App.tsx';


export function Root() {
  const manifestUrl =
  "https://raw.githubusercontent.com/yvikash18/mini-app/refs/heads/main/public/tonconnect-manifest.json";
  return (
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
      >
        <App/>
      </TonConnectUIProvider>

  );
}
