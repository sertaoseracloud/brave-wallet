/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useMemo, useState, MouseEvent } from 'react'
import './App.css'
import { Web3Repository } from './adapters/outbound/Web3Repository';
import { TokenController } from './adapters/inbound/TokenController';
import { GetTokenBalanceUseCase } from './core/application/usecases/GetTokenBalanceUseCase';
import { TransferTokenUseCase } from './core/application/usecases/TransferTokenUseCase';
import { TransferBnbTokenUseCase } from './core/application/usecases/TransferBnbUseCase';
import { GetBnbBalanceUseCase } from './core/application/usecases/GetBnbBalanceUseCase';

export default function App() {
     // Estado único para armazenar todos os valores
  const [state, setState] = useState({
    address: '<SUA CARTEIRA>',
    contract: 'BNB',
    balance: '',
    toAddress: '',
    quantity: '',
    message: ''
  });

  // Memoized version of the contract options to avoid re-rendering
  const contractOptions = useMemo(() => [
    { label: 'BNB', value: 'BNB' },
    { label: 'BTC', value: '0x53598858bC64f5f798B3AcB7F82FF2CB2aF463bf' },
    { label: 'ETH', value: '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378' },
    { label: 'USDC', value: '0x64544969ed7EBf5f083679233325356EbE738930' },
  ], []);

  // Função genérica para atualizar o estado
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  // Função para checar o saldo
  const handleCheckBalanceClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const balance = await tokenController.getTokenBalance(state.address, state.contract);
      setState(prevState => ({ ...prevState, balance }));
    } catch (error: any) {
      setState(prevState => ({ ...prevState, message: `Error: ${error.message}` }));
    }
  }, [state.address, state.contract]);

  // Função para transferir tokens
  const handleTransferClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const transactionHash = await tokenController.transferToken(state.toAddress, state.contract, state.quantity);
      setState(prevState => ({ ...prevState, message: `Transaction successful: ${transactionHash}` }));
    } catch (error: any) {
      setState(prevState => ({ ...prevState, message: `Error: ${error.message}` }));
    }
  }, [state.toAddress, state.contract, state.quantity]);

  return (
    <div>
      <p>
        My Address:
        <input
          type="text"
          name="address"
          onChange={handleInputChange}
          value={state.address}
        />
      </p>
      <p>
        <select
          className="form-select"
          name="contract"
          onChange={handleInputChange}
          value={state.contract}
        >
          {contractOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Alterado para button */}
        <button onClick={handleCheckBalanceClick}>See Balance</button>
      </p>
      <p>Balance: {state.balance}</p>
      <hr />
      <p>
        To Address:
        <input
          type="text"
          name="toAddress"
          onChange={handleInputChange}
          value={state.toAddress}
        />
      </p>
      <p>
        Qty:
        <input
          type="text"
          name="quantity"
          onChange={handleInputChange}
          value={state.quantity}
        />
      </p>
      <p>
        {/* Alterado para button */}
        <button onClick={handleTransferClick}>Transfer</button>
      </p>
      <hr />
      <p>{state.message}</p>
    </div>
  );
}

const web3Repository = new Web3Repository();
  const tokenController = new TokenController(
    new GetBnbBalanceUseCase(web3Repository),
    new TransferBnbTokenUseCase(web3Repository),
    new GetTokenBalanceUseCase(web3Repository),
    new TransferTokenUseCase(web3Repository)
);