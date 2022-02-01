import '../styles/globals.css';
import { ThirdwebProvider } from '@3rdweb/react';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const supportedChainIds = [80001];
  const connectors = {
    injected: {},
    walletconnect: {},
    walletlink: {
      appName: 'thirdweb - demo',
      url: 'https://thirdweb.com',
      darkMode: false,
    },
  };

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
