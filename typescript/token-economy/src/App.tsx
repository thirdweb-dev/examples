import { ThirdwebProvider, ConnectWallet } from '@3rdweb/react';
import './App.css';
import TokenComponent from './components/TokenModule/TokenComponent';
import Buttons from './components/userbuttons/buttons';
import Card from './components/card/Card'
import GameModule from './components/gamemodule/GameModule';
import ApproveComponent from './components/approvemodule/ApproveComponent';


const supportedChainIds = [1, 4, 137, 250, 43114, 80001];

const connectors = {
  injected: {},
  walletconnect: {},
  walletlink: {
    appName: "My Token Economy",
    url: "https://thirdweb.com",
    darkMode: false,
  },
};

function App() {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      
      <div className="nav">
        <ConnectWallet />
      </div>
      
      <div className='cardss'>
            <Card title='My Balance' 
      imageUrl='https://simpleicon.com/wp-content/uploads/briefcase1.png' 
      body={<TokenComponent type="balance"/>}
      />
      <Card title='Total Supply' 
      imageUrl='http://simpleicon.com/wp-content/uploads/money-bag-3.png' 
      body={<TokenComponent type="supply"/>}
      />
      </div>
 
      <div className='buttonss'>
        <Buttons/>
      </div>

      <div className='game-container'>
        <GameModule/>
      </div>
      <div className='buttonss'>
      <ApproveComponent/>
      </div>
      
    </ThirdwebProvider>
  );
}
export default App;
