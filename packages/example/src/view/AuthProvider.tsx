import React from 'react';
import {
  Web3AuthProvider,
  ConfigureParam,
  MetamaskConnector,
  PhantomConnector,
} from '@3walletconnector/react';
import { EthereumChainInfoHelper } from '@3walletconnector/helpers';

export function AuthProvider(props: React.PropsWithChildren<unknown>) {
  const configure: ConfigureParam = {
    namespaces: '',
    defaultConnectChainId: EthereumChainInfoHelper.getMainnet().chainId,
    supportedEthereumChain: [
      EthereumChainInfoHelper.getMainnet(),
      EthereumChainInfoHelper.getRinkeby(),
    ],
  };

  return (
    <Web3AuthProvider
      configure={configure}
      connectors={[PhantomConnector, MetamaskConnector]}
    >
      {props.children}
    </Web3AuthProvider>
  );
}
