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

interface LoggedContext {
  walletConnector: WalletConnectorSdk;
  walletState: WalletState;
}

interface NotLoggedContext {
  walletConnector: WalletConnectorSdk;
  openLoginDialog: () => void;
}

interface WalletConnectStateProps {
  onLoadingBuilder: () => JSX.Element;
  onLoggedBuilder: (context: LoggedContext) => JSX.Element;
  onNotLoggedBuilder: (context: NotLoggedContext) => JSX.Element;
}

export function WalletConnectStateWrapper(props: WalletConnectStateProps) {
  return (
    <ExModalProvider>
      <WalletConnectStateContent {...props} />
    </ExModalProvider>
  );
}

function WalletConnectStateContent(props: WalletConnectStateProps) {
  const { onLoggedBuilder, onNotLoggedBuilder, onLoadingBuilder } = props;
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

  if (walletState.isEagerlyConnecting) return onLoadingBuilder();

  return (
    <>
      {walletState.isConnected
        ? onLoggedBuilder({ walletConnector, walletState })
        : onNotLoggedBuilder({ walletConnector, openLoginDialog })}
    </>
  );
}
