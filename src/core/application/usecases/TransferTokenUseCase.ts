import { TokenRepository } from "../../ports/TokenRepository";

export class TransferTokenUseCase {
    constructor(private readonly tokenRepository: TokenRepository) {}
    async execute(toAddress: string, contractAddress: string, quantity: string): Promise<string> {
      return this.tokenRepository.transferToken(toAddress, contractAddress, quantity);
    }
}