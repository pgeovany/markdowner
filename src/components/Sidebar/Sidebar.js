import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
// import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import StyledLink from '../shared/StyledLink';

export default function SideBar() {
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!userData) {
      return;
    }

    async function fetchData() {
      const URL = 'https://mark-downer-api.herokuapp.com/texts';

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      try {
        const response = await axios.get(`${URL}`, config);
        setNotes(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []); //eslint-disable-line

  function genSideBar() {
    if (!userData) {
      return (
        <Container>
          <StyledLink to="/sign-in">Entre</StyledLink>
          <StyledLink to="/sign-up">Cadastre-se</StyledLink>
        </Container>
      );
    }
    return (
      <Container>
        {notes.length > 0 ? notes.map((note) => <p>{note.title}</p>) : null}
      </Container>
    );
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
  width: 20%;
  background-color: var(--color7);
  color: var(--color5);
  color: white;
  -webkit-animation-name: slideInLeft;
  animation-name: slideInLeft;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  @-webkit-keyframes slideInLeft {
    0% {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
      visibility: visible;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes slideInLeft {
    0% {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
      visibility: visible;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  z-index: 2;
  @media (max-width: 767px) {
    width: 40%;
  }
`;
