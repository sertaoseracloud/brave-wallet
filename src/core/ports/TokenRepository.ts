import { TransactionReceipt } from "web3";

export interface TokenRepository {
    getBnbBalance(address:string): Promise<string>;
    transferBnb(toAddress:string , quantity:string): Promise<TransactionReceipt>;
    getTokenBalance(address: string, contractAddress: string): Promise<string>;
    transferToken(toAddress: string, contractAddress: string, quantity: string): Promise<string>;
}