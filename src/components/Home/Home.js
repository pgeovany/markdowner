import { useState, useContext } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import FileSaver from 'file-saver';
import Button from '../shared/Button';
import Logo from '../shared/Logo';
import SideBar from '../Sidebar/Sidebar';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import OpenNoteContext from '../../contexts/OpenNoteContext';

export default function Home() {
  const [noteText, setNoteText] = useState('');
  const { noteTitle, setNoteTitle } = useContext(OpenNoteContext);
  const { userData } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const { openNote, setOpenNote } = useContext(OpenNoteContext);

  function downloadNote() {
    const blob = new Blob([noteText], { type: 'text/markdown;charset=utf-8' });
    FileSaver.saveAs(blob, 'markdown.md');
  }

  async function saveNote() {
    if (!userData) {
      alert('Você precisa estar conectado para salvar suas notas!');
      return;
    }
    const URL = 'https://mark-downer-api.herokuapp.com/texts';

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const body = {
      title: noteTitle,
      email: userData.email,
      text: noteText,
      date: dayjs().format('MM/DD/YY'),
    };

    try {
      await axios.post(`${URL}`, body, config);
      alert('nota salva com sucesso');
    } catch (error) {
      console.log(error);
    }
  }

  function insertTitle() {
    if (noteTitle) {
      return <></>;
    } else {
      return setNoteTitle(prompt('Insira um titulo para sua nota!'));
    }
  }
  function newNote() {
    setNoteTitle('');
    setOpenNote(null);
  }

  return (
    <>
      <SidebarVisible onClick={() => setVisible(!visible)}>
        {visible ? <SideBar /> : <ion-icon name="menu-sharp"></ion-icon>}
      </SidebarVisible>
      <StyledBody>
        <Logo />
        <NoteContainer>
          <Editor>
            <Title>Markdown</Title>
            <TextArea
              autoFocus
              value={openNote ? openNote : noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onClick={() => insertTitle()}
            ></TextArea>
          </Editor>
          <Editor>
            <Title>Preview</Title>
            <Preview>
              <MDEditor.Markdown
                source={openNote ? openNote : noteText}
                style={{
                  whiteSpace: 'pre-wrap',
                  background: 'var(--color2)',
                }}
              />
            </Preview>
          </Editor>
        </NoteContainer>
        <br />
        <ButtonsContainer>
          <Button onClick={downloadNote}>Baixar nota</Button>
          <Button onClick={saveNote}>Salvar nota</Button>
          <Button onClick={newNote}>Nova Nota</Button>
        </ButtonsContainer>
      </StyledBody>
    </>
  );
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 100px;

  @media (max-width: 767px) {
    width: 100%;
    margin: 0;
  }
`;

const NoteContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 80%;
  color: var(--color3);

  @media (max-width: 767px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-top: 10px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background-color: var(--color2);
  resize: none;

  &&:focus {
    outline: none;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
`;

const Preview = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: none;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Editor = styled.div`
  width: 46%;
  height: 550px;
  padding: 10px;
  background-color: var(--color2);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 6px -6px #483434;

  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
    height: 380px;
    :first-child {
      margin-top: 50px;
    }
    :last-child {
      margin-bottom: 50px;
    }
  }
`;

const Title = styled.h1`
  align-self: center;
  font-size: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin: 0;
  Button {
    width: 200px;
    margin: 5px;
  }

  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    right: 0;
    Button {
      width: 150px;
      margin: 5px;
    }
  }
`;

// const HomeButton = styled.button`
//   margin-top: 30px;
//   width: 100px;
//   height: 40px;
//   background-color: red;
//   margin-right: 20px;
//   margin-left: 20px;
//   @media (max-width: 767px) {
//     width: 100px;
//     margin: 5px;
//   }
// `;

const SidebarVisible = styled.div`
  ion-icon {
    font-size: 40px;
    margin: 5px;
    position: fixed;
    top: 0;
    z-index: 1;
    cursor: pointer;
    color: var(--color4);
  }

  @media (max-width: 767px) {
    ion-icon {
      font-size: 32px;
    }
  }
  /* Button {
    width: fit-content;
    top: 0;
    ion-icon {
      font-size: 32px;
      margin: 5px;
    }
    position: fixed;

    z-index: 1;
  }
  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    z-index: 1;
  } */
`;
