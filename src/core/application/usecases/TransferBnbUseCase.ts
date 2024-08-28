import { TransactionReceipt } from "web3";
import { TokenRepository } from "../../ports/TokenRepository";

export class TransferBnbTokenUseCase {
    constructor(private readonly tokenRepository: TokenRepository) {}
    async execute(toAddress: string, quantity: string): Promise<TransactionReceipt> {
      return this.tokenRepository.transferBnb(toAddress,quantity);
    }
}