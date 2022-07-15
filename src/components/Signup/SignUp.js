import styled from 'styled-components';
import Logo from '../shared/Logo';
import SignUpForm from './SignUpForm';
import StyledLink from '../shared/StyledLink';
import ButtonBackHome from '../shared/ButtonBackHome';

export default function SignUp() {
  return (
    <StyledBody>
      <Container>
        <Logo />
        <SignUpForm />
        <StyledLink to="/sign-in">Já tem uma conta? Entre agora!</StyledLink>
        <ButtonBackHome />
      </Container>
    </StyledBody>
  );
}

const StyledBody = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
