import React, { useState } from 'react';
import Web3Connect from "./Web3Connect";
import '../css/Authorization.css';
import WalletPanel from './WalletPanel';

const Authorization = () => {
  const { web3, contract } = Web3Connect();

  const [seedPhrase, setSeedPhrase] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [walletAddress,  setWalletAddress] = useState('');

  const handleSeedPhraseChange = (e) => {
    setSeedPhrase(e.target.value);
  };

  const handleAuthorization = () => {
    setAuthorized(true);
  };

  const getAddressByPrivateKey = () => {

    const privateKey = document.getElementById("data-field").value;

    if (!privateKey || privateKey.length !== 66) {
        throw new Error('Invalid private key');
    }

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    console.log(account.address);
    setWalletAddress(account.address);

    return account.address;
  }
  
  return (
    <div className="authorization-container">
      <h2>Кошелёк UniBlockchain (demo)</h2>
      {!authorized ? (
        <form className="authorization-form" onSubmit={handleAuthorization}>
          <label>
            Пожалуйста, введите приватный ключ для авторизации в кошельке:
            <input 
              id="data-field"
              type="text"
              value={seedPhrase}
              onChange={handleSeedPhraseChange}
              required
            />
          </label>
          <button onClick={getAddressByPrivateKey} type="submit">Авторизоваться</button>
        </form>
      ) : (
        <div>
          <p>Successfully authorized!</p>
          <WalletPanel walletAddress={walletAddress}/>
        </div>
      )}
    </div>
  );
};

export default Authorization;
