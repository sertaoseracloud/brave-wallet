import { GetBnbBalanceUseCase } from "../../core/application/usecases/GetBnbBalanceUseCase";
import { GetTokenBalanceUseCase } from "../../core/application/usecases/GetTokenBalanceUseCase";
import { TransferBnbTokenUseCase } from "../../core/application/usecases/TransferBnbUseCase";
import { TransferTokenUseCase } from "../../core/application/usecases/TransferTokenUseCase";

export class TokenController {
  constructor(
    private readonly getBnbBalanceUseCase: GetBnbBalanceUseCase,
    private readonly transferBnbUseCase: TransferBnbTokenUseCase,
    private readonly getTokenBalanceUseCase: GetTokenBalanceUseCase,
    private readonly transferTokenUseCase: TransferTokenUseCase
  ) {}

  async getTokenBalance(address: string, contractAddress: string) {
    if (contractAddress === "BNB")
        return this.getBnbBalanceUseCase.execute(address);
    else
        return this.getTokenBalanceUseCase.execute(address, contractAddress);
  }

  async transferToken(toAddress: string, contractAddress: string, quantity: string) {
    if (contractAddress === "BNB")
        return this.transferBnbUseCase.execute(toAddress, quantity)
    else
        return this.transferTokenUseCase.execute(toAddress, contractAddress, quantity);
  }
}