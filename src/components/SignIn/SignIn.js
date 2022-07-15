import styled from 'styled-components';
import Logo from '../shared/Logo';
import SignInForm from './SignInForm';
import StyledLink from '../shared/StyledLink';
import ButtonBackHome from '../shared/ButtonBackHome';

export default function SignIn() {
  return (
    <StyledBody>
      <Container>
        <Logo />
        <SignInForm />
        <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
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
