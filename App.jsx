import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json"

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xC6FA8d883ae61310dcAc7168BF933D125D2649C5"
  const contractABI = abi.abi;
  const checkIfWalletConnected = async () => {
    try{
  	  const { ethereum } = window;
  	  if(!ethereum){
  		  console.log("Make sure you have metamask!");
  	  }
  	  else{
  		  console.log("We have the ethereum object " + ethereum)
  	  }

      const accounts = await ethereum.request({ method: "eth_accounts"});

      if(accounts.length !== 0){
          const account = accounts[0];
          setCurrentAccount(account);
      }
      else{
          console.log("No Authorised account found!")
      }
    }
    catch(e){
      console.log(e);
    }
  }
  const connectWallet = async () => {
    try{
      const { ethereum } = window;

      if(!ethereum){
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected to:", accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch(e){
      console.log(e)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(wavePortalContract)
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // const wave = async () => {
  //   try {
  //     const { ethereum } = window;
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  //       let count = await wavePortalContract.getTotalWaves();
  //       console.log("Retrived total wave count...", count.toNumber());
  //     }
  //     else{
  //       console.log("Ethereum object dosen't exist!");
  //     }
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }
  
  useEffect(() => {
      checkIfWalletConnected();
  })
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Rohit, 15, Tech enthusiast! Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}