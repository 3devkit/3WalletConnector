import { useMemo } from 'react';
import { EthConnector, WalletState } from '@3walletconnector/core';
import { useWalletConnector } from './WalletConnector';
import { Web3Provider } from '@ethersproject/providers';
import { useStore } from 'zustand';

export function useWalletState() {
  const walletConnector = useWalletConnector();

  const storeData = useStore(walletConnector.store.originalStore);

  const walletState = useMemo(() => {
    return WalletState.fromDto(storeData);
  }, [storeData]);

  return walletState;
}

export function useChainId() {
  const walletConnector = useWalletConnector();

  const chainId = useStore(
    walletConnector.store.originalStore,
    state => state.chainId,
  );

  return chainId;
}

export function useWeb3Provider(): Web3Provider | undefined {
  const walletConnector = useWalletConnector();

  const chainId = useChainId();

  const web3Provider = useMemo(() => {
    if (!walletConnector.connector) return;
    return (walletConnector.connector as EthConnector).web3Provider;
  }, [chainId]);

  return web3Provider;
}
