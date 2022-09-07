import { EthereumChainInfo } from '@3walletconnector/helpers';

export interface ConfigureParam {
  namespace?: string;
  defaultConnectChainId: number;
  supportedEthereumChain: EthereumChainInfo[];
}

export class Configure {
  public constructor(
    public namespace: string,
    public defaultConnectChainId: number,
    public supportedEthereumChain: EthereumChainInfo[],
  ) {}

  public static fromParam(dto: ConfigureParam) {
    return new Configure(
      dto.namespace ?? '',
      dto.defaultConnectChainId,
      dto.supportedEthereumChain,
    );
  }

  public getEthereumChainInfo(chainId: number) {
    return this.supportedEthereumChain.find(chain => chain.chainId === chainId);
  }
}
