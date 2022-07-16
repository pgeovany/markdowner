import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
// import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import StyledLink from '../shared/StyledLink';
import OpenNoteContext from '../../contexts/OpenNoteContext';
import Button from '../shared/Button';
// import { title } from '@uiw/react-md-editor';

export default function SideBar() {
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const { setOpenNote } = useContext(OpenNoteContext);
  const { setNoteTitle } = useContext(OpenNoteContext);

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
  }, [setOpenNote]); //eslint-disable-line

  function genSideBar() {
    function getNote(note) {
      setOpenNote(note.text);
      setNoteTitle(note.title);
    }

    async function deleteNote(id) {
      const confirmDelete = window.confirm('Deseja deletar esta nota?');
      if (confirmDelete) {
        try {
          await axios.delete(
            `https://mark-downer-api.herokuapp.com/texts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          );
        } catch (error) {
          alert('Erro ao deletar a nota!');
        }
      }
    }

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
        {notes.length > 0
          ? notes.map((note) => (
              <div>
                <p onClick={() => getNote(note)}>{note.title}</p>
                <p>
                  <Button onClick={() => deleteNote(note._id)}>DELETAR</Button>
                </p>
              </div>
            ))
          : null}
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
  color: var(--color4);
  padding: 15px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  p {
    font-weight: 700;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  Button {
    width: 50px;
    height: 15px;
    font-size: 9px;
    margin: 0;
    :first-child {
      width: fit-content;
      font-size: 12px;
    }
  }

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
