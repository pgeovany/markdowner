import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

export default function SideBar() {
  const { userData } = useContext(UserContext);

  function genSideBar() {
    if (!userData) {
      return (
        <Container>
          <Link to="/sign-in">Entre</Link>
          <Link to="/sign-up">Cadastre-se</Link>
        </Container>
      );
    }
    return <></>;
  }

  return <>{genSideBar()}</>;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 180px;
  background-color: black;
  color: white;
`;
