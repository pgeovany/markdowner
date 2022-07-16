import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: var(--color2);
  color: var(--color4);
  border-radius: 4px;
  border: none;
  box-shadow: 0 5px 3px -3px #483434;
  cursor: pointer;
  padding: 14px;
  font-weight: 700;
  line-height: 23px;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    box-shadow: none;
  }
`;

export default Button;
