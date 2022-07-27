import React, { useMemo } from 'react';
import { WalletConnectorSdk, WalletState } from '@3walletconnector/core';
import { useWalletConnector, useWalletState } from './../context';
import {
  ExDialogBox,
  ExLoading,
  ExModalProvider,
  useModalAction,
} from '@3lib/components';
import { useMemoizedFn } from 'ahooks';
import { WalletList } from './WalletLogin';
import styles from './styles.less';

export interface ConnectedContext {
  walletConnector: WalletConnectorSdk;
  walletState: WalletState;
}

export interface NotConnectedContext {
  walletConnector: WalletConnectorSdk;
  openLoginDialog: () => void;
}

export interface WalletConnectStateProps {
  onConnectingBuilder: () => JSX.Element;
  onConnectedBuilder: (context: ConnectedContext) => JSX.Element;
  onNotConnectedBuilder: (context: NotConnectedContext) => JSX.Element;
}

export function WalletConnectStateWrapper(props: WalletConnectStateProps) {
  return (
    <ExModalProvider>
      <WalletConnectStateContent {...props} />
    </ExModalProvider>
  );
}

function WalletConnectStateContent(props: WalletConnectStateProps) {
  const { onConnectingBuilder, onConnectedBuilder, onNotConnectedBuilder } =
    props;
  const { openDialog } = useModalAction();

  const walletConnector = useWalletConnector();
  const walletState = useWalletState();

  const openLoginDialog = useMemoizedFn(() => {
    openDialog(
      <ExDialogBox title={'Connect Wallet'}>
        <div className={styles.DialogContent}>
          <WalletList />
        </div>
      </ExDialogBox>,
    );
  });

  if (walletState.isEagerlyConnecting) return onConnectingBuilder();

  return (
    <>
      {walletState.isConnected
        ? onConnectedBuilder({ walletConnector, walletState })
        : onNotConnectedBuilder({ walletConnector, openLoginDialog })}
    </>
  );
}
