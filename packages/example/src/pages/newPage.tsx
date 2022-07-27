import React from 'react';
import { Container } from 'react-bootstrap';
import { LoginBox } from '@/view/LoginBox';

export default function Page() {
  return (
    <Container>
      <div>newPage:</div>
      <LoginBox />
    </Container>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
