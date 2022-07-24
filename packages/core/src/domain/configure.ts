import { EthereumChainInfo } from '@3walletconnector/helpers';

export interface ConfigureParam {
  appName: string;
  defaultConnectChainId: number;
  supportedEthereumChain: EthereumChainInfo[];
}

export class Configure {
  public constructor(
    public appName: string,
    public defaultConnectChainId: number,
    public supportedEthereumChain: EthereumChainInfo[],
  ) {}

  public static fromParam(dto: ConfigureParam) {
    return new Configure(
      dto.appName,
      dto.defaultConnectChainId,
      dto.supportedEthereumChain,
    );
  }

  public getEthereumChainInfo(chainId: number) {
    return this.supportedEthereumChain.find(chain => chain.chainId === chainId);
  }
}
