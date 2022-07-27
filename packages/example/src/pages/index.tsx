import React from 'react';
import { Container } from 'react-bootstrap';
import {
  useWalletState,
  useChainId,
  useWalletConnector,
  useWeb3Provider,
} from '@3walletconnector/react';
import { LoginBox } from '@/view/LoginBox';
import Link from 'next/link';
import { ExButton } from '@3lib/components';

export default function Page() {
  // const walletConnector = useWalletConnector();
  // const walletState = useWalletState();
  const web3Provider = useWeb3Provider();
  // const chainId = useChainId();

  console.info('walletState : ', web3Provider);

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

      <ExButton
        onClick={async () => {
          if (!web3Provider) return;

          const signer = web3Provider.getSigner();
          console.info('====signer========', await signer.signMessage('dasd'));
        }}
      >
        Sign Message
      </ExButton>
    </Container>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
