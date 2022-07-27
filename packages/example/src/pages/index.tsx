import React from 'react';
import { Container } from 'react-bootstrap';
import { ExButton, ExLoading, ExPopover, ExPopoverBox } from '@3lib/components';
import { StyleHelper } from '@3lib/helpers';
import {
  Web3AuthProvider,
  ConfigureParam,
  WalletConnectStateWrapper,
  MetamaskConnector,
  PhantomConnector,
  useWalletState,
  useWalletConnector,
  useWeb3Provider,
} from '@3walletconnector/react';
import { EthereumChainInfoHelper } from '@3walletconnector/helpers';
import styles from './index.module.scss';

export default function Page() {
  return <PageConnent />;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutConnent>{page}</LayoutConnent>;
};

function LayoutConnent(props: React.PropsWithChildren<unknown>) {
  const configure: ConfigureParam = {
    appName: '',
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

function PageConnent() {
  // const walletConnector = useWalletConnector();
  // const walletState = useWalletState();
  const web3Provider = useWeb3Provider();

  console.info(
    '======PageConnent========',
    // walletConnector.connector,
    // walletState,
    web3Provider,
  );

  return (
    <Container>
      <WalletConnectStateWrapper
        onLoadingBuilder={() => {
          return <ExLoading />;
        }}
        onLoggedBuilder={context => {
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
        onNotLoggedBuilder={context => {
          return (
            <ExButton onClick={context.openLoginDialog}>
              Connect Wallet
            </ExButton>
          );
        }}
      />
    </Container>
  );
}
