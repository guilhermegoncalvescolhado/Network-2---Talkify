import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Coastal';
      src: url('../fonts/coastal/Coastal-Clean.ttf') format('truetype');
  }

  *, *::before, *::after {
    font-family: 'Coastal', Arial, sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif; /* Use a fonte que preferir */
    background-color: #f5f5f5; /* Cor de fundo padrão */
    color: #333; /* Cor do texto padrão */
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit; /* Mantém a cor do texto padrão */
  }

  button {
    cursor: pointer;
  }
`;
export default GlobalStyle;
