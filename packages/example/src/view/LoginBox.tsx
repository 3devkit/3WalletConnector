import React from 'react';
import { ExButton, ExLoading, ExPopover, ExPopoverBox } from '@3lib/components';
import { StyleHelper } from '@3lib/helpers';
import { WalletConnectStateWrapper } from '@3walletconnector/react';
import styles from './LoginBox.module.scss';

export function LoginBox() {
  return (
    <WalletConnectStateWrapper
      onConnectingBuilder={() => {
        return <ExLoading />;
      }}
      onConnectedBuilder={context => {
        return (
          <div className={styles.UserBox}>
            <ExPopover
              onButtonBuilder={open => {
                return (
                  <div
                    className={StyleHelper.combinedSty(
                      styles.UserInfo,
                      open && styles.selected,
                    )}
                  >
                    <div className={styles.avatar} />
                    <div className={styles.name}>
                      {context.walletState.shortAccount}
                    </div>
                  </div>
                );
              }}
              onPopoverBuilder={closeHandle => {
                return (
                  <ExPopoverBox>
                    <ul className={styles.MenuList} style={{ width: 200 }}>
                      <li
                        onClick={() => {
                          closeHandle();
                          context.walletConnector.disconnect();
                        }}
                      >
                        <div className={styles.left}>Disconnect Wallet</div>
                      </li>
                    </ul>
                  </ExPopoverBox>
                );
              }}
            />
          </div>
        );
      }}
      onNotConnectedBuilder={context => {
        return (
          <ExButton onClick={context.openLoginDialog}>Connect Wallet</ExButton>
        );
      }}
    />
  );
}
