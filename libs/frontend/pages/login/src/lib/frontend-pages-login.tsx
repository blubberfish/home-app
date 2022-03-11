import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendPagesLoginProps {}

const StyledFrontendPagesLogin = styled.div`
  color: pink;
`;

export function FrontendPagesLogin(props: FrontendPagesLoginProps) {
  return (
    <StyledFrontendPagesLogin>
      <h1>Welcome to FrontendPagesLogin!</h1>
    </StyledFrontendPagesLogin>
  );
}

export default FrontendPagesLogin;
