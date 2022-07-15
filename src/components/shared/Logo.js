import styled from 'styled-components';

export default function Logo() {
  return <LogoContainer>MarkDowner</LogoContainer>;
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Special Elite', cursive;
  width: 200px;
  height: 50px;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 0.05em;
  align-items: center;
  margin: 10px;
`;
