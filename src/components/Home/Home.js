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

export default function Home() {
  const [noteText, setNoteText] = useState('');
  const [noteTitle] = useState('test');
  const { userData } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      <SidebarVisible onClick={() => setVisible(!visible)}>
        {visible ? (
          <SideBar />
        ) : (
          <Button>
            <ion-icon className="ion-icon" name="caret-forward"></ion-icon>
            OPÇÕES
          </Button>
        )}
      </SidebarVisible>
      <StyledBody>
        <Logo />
        <NoteContainer>
          <Editor>
            <Title>Markdown</Title>
            <TextArea
              autoFocus
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></TextArea>
          </Editor>
          <Editor>
            <Title>Preview</Title>
            <Preview>
              <MDEditor.Markdown
                source={noteText}
                style={{ whiteSpace: 'pre-wrap', background: 'lightblue' }}
              />
            </Preview>
          </Editor>
        </NoteContainer>
        <br />
        <ButtonsContainer>
          <HomeButton onClick={downloadNote}>Baixar nota</HomeButton>
          <HomeButton onClick={saveNote}>Salvar nota</HomeButton>
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
  margin-left: 60px;
`;

const NoteContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 80%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100vh;
  border: none;
  background-color: lightblue;
  resize: none;

  &&:focus {
    outline: none;
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
`;

const Editor = styled.div`
  width: 46%;
  height: 400px;
  padding: 10px;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  align-self: center;
  font-size: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const HomeButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 40px;
  background-color: red;
  margin-right: 20px;
  margin-left: 20px;
`;

const SidebarVisible = styled.div`
  Button {
    width: fit-content;
    top: 0;
    ion-icon {
      font-size: 32px;
      margin: 5px;
    }
  }
`;
