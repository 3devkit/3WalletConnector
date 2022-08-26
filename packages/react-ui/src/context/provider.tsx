import React, { useMemo } from 'react';
import {
  BaseConnector,
  Configure,
  ConfigureParam,
  WalletConnectorSdk,
} from '@3walletconnector/core';
import { WalletConnectorProvider } from './WalletConnector';
import { Class } from 'utility-types';

export interface Web3AuthProviderProps {
  configure: ConfigureParam;
  connectors: Class<BaseConnector>[];
}

export function Web3AuthProvider(
  props: React.PropsWithChildren<Web3AuthProviderProps>,
) {
  const { configure, connectors } = props;

  const walletConnector = useMemo(() => {
    const walletConnector = new WalletConnectorSdk(
      Configure.fromParam(configure),
      connectors,
    );

    return walletConnector;
  }, []);

  return (
    <WalletConnectorProvider walletConnector={walletConnector}>
      {props.children}
    </WalletConnectorProvider>
  );
}
