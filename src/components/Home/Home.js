import styled from 'styled-components';
import Logo from '../shared/Logo';
export default function Home() {
  return (
    <StyledBody>
      <Logo />
    </StyledBody>
  );
}

const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
