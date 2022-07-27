import React, { useMemo } from 'react';
import {
  BaseConnector,
  Configure,
  ConfigureParam,
  WalletConnectorSdk,
} from '@3walletconnector/core';
import { WalletConnectorProvider } from './WalletConnector';
import { WalletStateProvider } from './WalletState';
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
    );

    connectors.forEach(Connector => {
      walletConnector.addConnector(
        (actions, configure) => new Connector(actions, configure),
      );
    });

    return walletConnector;
  }, []);

  return (
    <WalletConnectorProvider walletConnector={walletConnector}>
      <WalletStateProvider>{props.children}</WalletStateProvider>
    </WalletConnectorProvider>
  );
}
