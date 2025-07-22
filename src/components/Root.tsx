import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { publicUrl } from '@/helpers/publicUrl.ts';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  // Use root-level manifest URL for better TON Connect compatibility
  const manifestUrl = import.meta.env.DEV 
    ? '/tonconnect-manifest.json'
    : publicUrl('tonconnect-manifest.json');

  console.log('TON Connect manifest URL:', manifestUrl);

  return (
    <ErrorBoundary fallback={<ErrorBoundaryError error={new Error('Unknown error')} />}>
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
      >
        <App/>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
