import React, { useState, useEffect } from "react";
import Web3Connect from "./Web3Connect";
import CryptoJS from 'crypto-js';
import "../App.css";

const WalletPanel = ({ walletAddress }) => {

    const { web3, contract } = Web3Connect();

    const [selectedTab, setSelectedTab] = useState('assets');
    const [ucpRecords, setUcpRecords] = useState([]);

    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };
    
    const tabs = ['Главная', 'Расширения', 'Журнал', 'Транзакции', 'Настройки'];
    
    const tabButtonStyle = {
      padding: '10px 15px',
      borderRadius: '5px',
      margin: '0 5px',
      cursor: 'pointer',
      backgroundColor: '#0366d6',
      color: '#fff',
      border: 'none',
      outline: 'none',
    };
    
    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      border: '2px solid #0366d6',
      borderRadius: '10px',
      backgroundColor: '#f6f6f6',
    };
    
    const balanceStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '20px 0',
    };
    
    const tokenListStyle = {
      textAlign: 'left',
      marginTop: '10px',
    };
    
    const tokenItemStyle = {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '5px',
    };
    
    const getData = async () => {
  
      try {
        const ucpRecords = await contract.methods.getUCPs(walletAddress).call();
        console.log(ucpRecords);
        setUcpRecords(ucpRecords);
      } catch (error) {
        console.error('Problem has been detected:', error);
      }
    };
  
    const handleNFTButtonClick = async () => {
      setSelectedTab('Токен');
      await getData();
    };
    
    const handleTokenButtonClick = async () => {
      
      await getData();
    };
    
    const renderTokens = (tokenList, contractAddress) => {
      return tokenList.map((token, index) => {

        const stringValue = `${contractAddress}${token.ucpName}${token.ucpDescription}`;
        const ucpHashValue = CryptoJS.SHA256(stringValue).toString(CryptoJS.enc.Hex).slice(0, 38);
        
        return (
          <div key={index} style={tokenItemStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/ub_logo.PNG"
                alt="Token Image"
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
              />
              <div>
                <div><b>Адрес контракта:</b> {contract._address}</div>
                <div><b>Хэш-идентификатор токена:</b> {"0x" + ucpHashValue}</div>
                <br/>
                <div><b>Наименование токена:</b> {token.ucpName}</div>
                <div><b>Описание токена:</b> {token.ucpDescription}</div>
                <div><b>Подтверждение:</b> {token.confirmed ? 'Подтверждено' : 'Ожидает подтверждения'}</div>
                <br/>
                <button>Детали токена</button>
                <br/>
                <button>Посмотреть код смарт-контракта</button>
                <br/>
                <button>Заключить смарт-контракт на данный токен</button>
              </div>
            </div>
          </div>
        );
      });
    };
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <div style={{ width: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f6f6f6', padding: '10px', borderRadius: '10px 10px 0 0' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  ...tabButtonStyle,
                  backgroundColor: selectedTab === tab ? '#0366d6' : '#ccc',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={contentStyle}>
            <h2>Здесь будет {selectedTab === 'assets' ? 'assets' : selectedTab} </h2>
            <div style={balanceStyle}>
              Баланс: 100 UBT
            </div>
            <div style={tokenListStyle}>
              {selectedTab === 'Токен' && (
                <>
                  <h2>Мои токены</h2>
                  {renderTokens(ucpRecords)}
                </>
              )}
              {selectedTab === 'tokens' && (
                <>
                  <h3>Мои ЦФА-токены</h3>
                  
                </>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={handleNFTButtonClick} style={tabButtonStyle}>Мои токены</button>
              <button onClick={handleTokenButtonClick} style={tabButtonStyle}>Прочие активы</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default WalletPanel;