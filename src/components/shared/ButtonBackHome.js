import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ButtonBackHome() {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <StyledButton onClick={goHome}>
      <span>Voltar para Home</span>
    </StyledButton>
  );
}

const StyledButton = styled.div`
  margin-top: 20px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  span {
    text-decoration: underline;
    font-size: 12px;
  }
`;
