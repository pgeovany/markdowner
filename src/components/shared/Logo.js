import styled from 'styled-components';

export default function Logo() {
  return <LogoContainer>MarkDowner</LogoContainer>;
}

const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Special Elite', cursive;
  width: 300px;
  height: 50px;
  font-size: 34px;
  line-height: 32px;
  letter-spacing: 0.05em;
  align-items: center;

  padding-top: 15px;
  color: var(--color4);
  background-color: var(--color6);
  box-shadow: 0 5px 3px -3px #483434;
  @media (max-width: 767px) {
    top: 0;
    width: 100%;
    background-color: var(--color6);
    margin: 0;
    letter-spacing: 0.004em;
    box-shadow: none;
  }
`;
