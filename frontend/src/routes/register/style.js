import styled from "styled-components";

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
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
  width: 200px;
  margin: 20px auto;

  &:hover {
    background-color: #440044;
  }
`;

export const Text = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  text-align: center;
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
