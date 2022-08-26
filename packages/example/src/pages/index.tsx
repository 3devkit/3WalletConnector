import React, { useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import {
  useWalletState,
  useChainId,
  useWalletConnector,
  useWeb3Provider,
  MetamaskConnector,
} from '@3walletconnector/react';
import { LoginBox } from '@/view/LoginBox';
import Link from 'next/link';
import { ExButton } from '@3lib/components';

export default function Page() {
  const walletConnector = useWalletConnector();
  const web3Provider = useWeb3Provider();
  const walletState = useWalletState();
  const chainId = useChainId();

  const [siginInfo, setSiginInfo] = useState<string>();

  return (
    <Container>
      <Stack gap={3}>
        <Stack direction="horizontal" gap={3}>
          <LoginBox />
        </Stack>

        {walletState.isConnected && (
          <>
            <Stack direction="horizontal" gap={3}>
              <ExButton
                onClick={async () => {
                  const siginInfo = await walletConnector.signMessage('hello');
                  setSiginInfo(siginInfo);
                }}
              >
                Sign Message
              </ExButton>
            </Stack>

            <div>{siginInfo}</div>
          </>
        )}
      </Stack>
    </Container>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
