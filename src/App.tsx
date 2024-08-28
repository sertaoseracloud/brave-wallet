/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import './App.css'
import { Web3Repository } from './adapters/outbound/Web3Repository';
import { TokenController } from './adapters/inbound/TokenController';
import { GetTokenBalanceUseCase } from './core/application/usecases/GetTokenBalanceUseCase';
import { TransferTokenUseCase } from './core/application/usecases/TransferTokenUseCase';
import { TransferBnbTokenUseCase } from './core/application/usecases/TransferBnbUseCase';
import { GetBnbBalanceUseCase } from './core/application/usecases/GetBnbBalanceUseCase';

export default function App() {
  const [address, setAddress] = useState("<SUA CARTEIRA>");
  const [contract, setContract] = useState("BNB");
  const [balance, setBalance] = useState('');
  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState('');

  async function checkBalance() {
    try{
      const balance = await tokenController.getTokenBalance(address, contract);
      setBalance(balance);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  }

  async function transfer() {
    try {
      const transactionHash = await tokenController.transferToken(toAddress, contract, quantity);
      setMessage(`Transaction successful: ${transactionHash}`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <p>
        My Address : <input type="text" onChange={evt => setAddress(evt.target.value)} value={address} />
      </p>
      <p>
        <select className="form-select" onChange={evt => setContract(evt.target.value)}>
          <option value="BNB">BNB</option>
          <option value="0x53598858bC64f5f798B3AcB7F82FF2CB2aF463bf">BTC</option>
          <option value="0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378">ETH</option>
          <option value="0x64544969ed7EBf5f083679233325356EbE738930">USDC</option>
        </select>
        <input type="button" value="See Balance" onClick={evt => checkBalance()} />
      </p>
      <p>
        Balance: {balance}
      </p>
      <hr />
      <p>
        To Address: <input type="text" onChange={evt => setToAddress(evt.target.value)} value={toAddress} />
      </p>
      <p>
        Qty: <input type="text" onChange={evt => setQuantity(evt.target.value)} value={quantity} />
      </p>
      <p>
        <input type="button" value="Transfer" onClick={transfer} />
      </p>
      <hr />
      <p>
        {message}
      </p>
    </div>
  )
}

const web3Repository = new Web3Repository();
  const tokenController = new TokenController(
    new GetBnbBalanceUseCase(web3Repository),
    new TransferBnbTokenUseCase(web3Repository),
    new GetTokenBalanceUseCase(web3Repository),
    new TransferTokenUseCase(web3Repository)
);