import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }: AppProps) {
  // We'll use 4 for Rinkeby
  const desiredChainId = 4;

  /**
   * Make sure that your app is wrapped with these contexts.
   * If you're using React, you'll have to replace the Component setup with {children}
   */
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
