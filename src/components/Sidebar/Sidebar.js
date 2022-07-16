import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
          <Link to="/sign-in">Entre</Link>
          <Link to="/sign-up">Cadastre-se</Link>
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
  width: 180px;
  background-color: black;
  color: white;
`;
