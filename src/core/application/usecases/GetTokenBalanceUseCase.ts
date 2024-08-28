import { TokenRepository } from "../../ports/TokenRepository";

export class GetTokenBalanceUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(address: string, contractAddress: string): Promise<string> {
    return this.tokenRepository.getTokenBalance(address, contractAddress);
  }
}