import styled from "styled-components";

export const GlobalContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  background: linear-gradient(45deg, #2c263a, #6b5769);
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  max-width: 800px;
  width: 45%;
  min-width: 350px;
  color: white;
  background-color: #1a0033;
  border-radius: 25px;
  box-shadow: 0 0 45px #8a2be2;
`;

export const Image = styled.img`
  max-width: 150px;
  transform: scale(2);
`;

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 50px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
`;

export const Button = styled.button`
  padding: 15px 30px;
  font-size: 1em;
  color: white;
  background-color: #2c0033;
  border: 3px solid #6b5769;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  width: 200px; /* Defina a largura para centralizar */
  margin: 20px auto; /* Centraliza horizontalmente o botão */
`;

export const ButtonHome = styled(Button)`
  /* Se você precisar adicionar estilos adicionais ao ButtonHome, pode fazê-lo aqui */
`;

export const Text = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  text-align: center; /* Certifica-se de que o texto também fica centralizado */
`;

export const SpecialLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;
