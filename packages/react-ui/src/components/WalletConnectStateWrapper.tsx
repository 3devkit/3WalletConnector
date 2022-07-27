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

interface WalletConnectStateProps {
  onLoggedBuilder: (context: WalletConnectStateContext) => JSX.Element;
  onNotLoggedBuilder: (context: WalletConnectStateContext) => JSX.Element;
}

export function WalletConnectStateWrapper(props: WalletConnectStateProps) {
  return (
    <ExModalProvider>
      <WalletConnectStateContent {...props} />
    </ExModalProvider>
  );
}

function WalletConnectStateContent(props: WalletConnectStateProps) {
  const { onLoggedBuilder, onNotLoggedBuilder } = props;
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

  const context = useMemo(() => {
    return new WalletConnectStateContext(
      walletConnector,
      walletState,
      openLoginDialog,
    );
  }, [walletConnector, walletState, openLoginDialog]);

  if (walletState.isEagerlyConnecting) return <ExLoading />;

  return (
    <>
      {walletState.isConnected
        ? onLoggedBuilder(context)
        : onNotLoggedBuilder(context)}
    </>
  );
}

class WalletConnectStateContext {
  public constructor(
    public walletConnector: WalletConnectorSdk,
    public walletState: WalletState,
    public openLoginDialog: () => void,
  ) {}
}
