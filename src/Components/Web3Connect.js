import React, { useState, useEffect } from "react";
import UCP from "../contracts/UCP.json";
import Web3 from "web3";
import "../App.css";

const Web3Connect = () => { 
    const [state, setState] = useState({
        web3: null,
        contract: null,
        newAccount: null,
      });
      
      useEffect(() => {
        const provider = new Web3.providers.HttpProvider(
          "http://193.124.114.41:8545/"
        );
        
        async function initializeWeb3() {
          const web3 = new Web3(provider);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = UCP.networks[networkId];
          
          const contract = new web3.eth.Contract(
            UCP.abi,
            deployedNetwork.address
          );
          
          setState({ web3, contract });
        }
    
        provider && initializeWeb3();
      }, []);

    return state;
}

export default Web3Connect