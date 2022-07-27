import React, { useContext, useState } from 'react';
import { createContext, useEffect } from 'react';
import { EthConnector, WalletState } from '@3walletconnector/core';
import { useWalletConnector } from './WalletConnector';
import { Web3Provider } from '@ethersproject/providers';

export const WalletStateConrtext = createContext<WalletState | null>(null);

export function WalletStateProvider(props: React.PropsWithChildren<unknown>) {
  const walletConnector = useWalletConnector();

  const [walletState, setWalletState] = useState<WalletState>(
    new WalletState(),
  );

  useEffect(() => {
    const unsubscribe = walletConnector.subscribeChange(state => {
      setWalletState(WalletState.fromDto(state));
    });

    walletConnector.eagerlyConnect();

    return () => {
      unsubscribe();
    };
  }, [walletConnector]);

  return (
    <WalletStateConrtext.Provider value={walletState}>
      {props.children}
    </WalletStateConrtext.Provider>
  );
}

export function useWalletState() {
  const context = useContext(WalletStateConrtext);

  if (!context) throw new Error('no WalletStateConrtext');

  return context;
}

export function useWeb3Provider(): Web3Provider | null {
  const walletConnector = useWalletConnector();

  useWalletState();

  if (!walletConnector.connector) return null;

  return (walletConnector.connector as EthConnector).web3Provider;
}
