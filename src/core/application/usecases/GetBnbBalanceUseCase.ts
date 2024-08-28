import { TokenRepository } from "../../ports/TokenRepository";

export class GetBnbBalanceUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(address: string): Promise<string> {
    return this.tokenRepository.getBnbBalance(address);
  }
}