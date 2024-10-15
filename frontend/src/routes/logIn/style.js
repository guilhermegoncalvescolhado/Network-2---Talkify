import styled from "styled-components";

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
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
