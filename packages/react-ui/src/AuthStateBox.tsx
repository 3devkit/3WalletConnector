import React, { useMemo } from 'react';
import { WalletConnectorSdk, WalletState } from '@3walletconnector/core';
import { useWalletConnector, useWalletState } from '@3walletconnector/react';
import {
  ExDialogBox,
  ExLoading,
  ExModalProvider,
  useModalAction,
} from '@3lib/components';
import { useMemoizedFn } from 'ahooks';
import { WalletList } from './WalletLogin';
import styles from './styles.less';

interface AuthStateBoxProps {
  onLoggedBuilder: (context: AuthStateBoxContext) => JSX.Element;
  onNotLoggedBuilder: (context: AuthStateBoxContext) => JSX.Element;
}

export function AuthStateBox(props: AuthStateBoxProps) {
  return (
    <ExModalProvider>
      <AuthStateBoxContent {...props} />
    </ExModalProvider>
  );
}

function AuthStateBoxContent(props: {
  onLoggedBuilder: (context: AuthStateBoxContext) => JSX.Element;
  onNotLoggedBuilder: (context: AuthStateBoxContext) => JSX.Element;
}) {
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
    return new AuthStateBoxContext(
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

class AuthStateBoxContext {
  public constructor(
    public walletConnector: WalletConnectorSdk,
    public walletState: WalletState,
    public openLoginDialog: () => void,
  ) {}
}
