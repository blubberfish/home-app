import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendPagesLandingProps {}

const StyledFrontendPagesLanding = styled.div`
  color: pink;
`;

export function FrontendPagesLanding(props: FrontendPagesLandingProps) {
  return (
    <StyledFrontendPagesLanding>
      <h1>Welcome to FrontendPagesLanding!</h1>
    </StyledFrontendPagesLanding>
  );
}

export default FrontendPagesLanding;
