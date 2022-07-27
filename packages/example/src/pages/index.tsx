import React from 'react';
import { Container } from 'react-bootstrap';
import {
  useWalletState,
  useWalletConnector,
  useWeb3Provider,
} from '@3walletconnector/react';
import { LoginBox } from '@/view/LoginBox';
import Link from 'next/link';
import { ExButton } from '@3lib/components';

export default function Page() {
  // const walletConnector = useWalletConnector();
  // const web3Provider = useWeb3Provider();
  const walletState = useWalletState();

  console.info('WalletState : ', walletState);

  return (
    <Container>
      <LoginBox />

      <div>
        <Link href={'/newPage'}>
          <span>
            <ExButton>NEW PAGE</ExButton>
          </span>
        </Link>
      </div>
    </Container>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
