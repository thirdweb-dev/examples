import type { NextPage } from 'next'
import { ConnectWallet } from '../components/ConnectWallet';

const Home: NextPage = () => {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
};

export default Home
