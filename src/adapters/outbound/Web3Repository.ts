import Web3 from 'web3';
import { TokenRepository } from "../../core/ports/TokenRepository";
import CONTRACT_ABI  from "../../config/abi.json";

export class Web3Repository implements TokenRepository {
  private web3: Web3;

  constructor() {
    if (!window.ethereum) throw new Error('No Brave Wallet');
    this.web3 = new Web3(window.ethereum);
  }

  async  getBnbBalance(address:string) {
    await this.hasAccount();
    const balance = await this.web3.eth.getBalance(address);
    return this.web3.utils.fromWei(balance, "ether");
  }

  async transferBnb(toAddress: string, quantity:string) {
    await this.hasAccount();
    const myAddress = window.ethereum.selectedAddress;
    const value = this.web3.utils.toWei(quantity, "ether");
    const nonce = await this.web3.eth.getTransactionCount(myAddress, 'latest');
    const transaction = { from: myAddress, to: toAddress, value, gas: 21000, nonce };
    return this.web3.eth.sendTransaction(transaction);
  }

  async getTokenBalance(address: string, contractAddress: string): Promise<string> {
    await this.hasAccount()
    const contract = new this.web3.eth.Contract(CONTRACT_ABI, contractAddress);
    const balance = await contract.methods.balanceOf(address).call();
    return this.web3.utils.fromWei(Number(balance), "ether");
  }

  async transferToken(toAddress: string, contractAddress: string, quantity: string): Promise<string> {
    await this.hasAccount()
    const from = window.ethereum.selectedAddress;
    const value = this.web3.utils.toWei(quantity, "ether");
    const contract = new this.web3.eth.Contract(CONTRACT_ABI, contractAddress, { from });
    const result = await contract.methods.transfer(toAddress, value).send();
    return result.transactionHash;
  }

  async hasAccount(){
    const accounts = await this.web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error('Wallet not found/allowed!');
  }
}