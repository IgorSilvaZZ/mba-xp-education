import { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";

type StyledButtonType = {
  variant?: "success" | "error";
};

const themeBlue = {
  main: "#3636e9",
  secondary: "#8d8dff",
};

const themeRed = {
  main: "red",
  secondary: "#fa8f8f",
};

const StyledHeader = styled.h1`
  color: ${(props) => props.theme.main};
  font-size: 42px;
`;

const StyledData = styled.p`
  color: ${(props) => props.theme.secondary};
  font-size: 24px;
  font-weight: 700;
`;

const StyledButton = styled.button<StyledButtonType>`
  background-color: transparent;
  border-radius: 8px;
  border: 2px solid black;
  padding: 8px 16px;

  :hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }

  ${(props) => {
    if (props.variant === "success") {
      return css`
        border-color: green;
        color: green;
      `;
    }

    if (props.variant === "error") {
      return css`
        border-color: red;
        color: red;
      `;
    }

    return "";
  }}
`;

function StyledComponents() {
  const [theme, setTheme] = useState(themeBlue);

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <StyledButton onClick={() => setTheme(themeBlue)}>
              Trocar tema para azul
            </StyledButton>
            <StyledButton onClick={() => setTheme(themeRed)}>
              Trocar tema para vermelho
            </StyledButton>
          </div>
          <StyledHeader>Igor Silva</StyledHeader>
          <StyledData>igor@email.com</StyledData>
          <StyledData>(11) 99999-9999</StyledData>
          <StyledData>Brasil</StyledData>

          <StyledButton variant='success'>Adicionar</StyledButton>
          <StyledButton variant='error' style={{ marginLeft: "8px" }}>
            Remover
          </StyledButton>

          <StyledButton style={{ marginLeft: "8px" }}>Detalhes</StyledButton>
        </ThemeProvider>
      </div>
    </>
  );
}

export default StyledComponents;
