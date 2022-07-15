import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 58px;
  background-color: ${(props) => (props.color ? '#CDCDCD' : '#FFF')};
  border: 1px solid ${(props) => (props.color ? '#FAFAFA' : '#000')};
  border-radius: 4px;
  padding: 14px;
  margin-bottom: 8px;

  :first-child {
    margin-top: 25px;
  }

  ::placeholder {
    color: '#000';
    font-style: italic;
  }
`;

export default Input;
