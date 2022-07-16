import { useState } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import Logo from '../shared/Logo';
import SideBar from '../Sidebar/Sidebar';

export default function Home() {
  const [noteText, setNoteText] = useState('');

  return (
    <>
      <SideBar />
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
  height: 50vh;
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
