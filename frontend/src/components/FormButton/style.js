import styled from "styled-components";

export const FormButton = styled.button`
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
  width: 90%; 
  margin: 20px auto; 
  text-align: center;
  &:hover {
    background-color: #440044;
  }
`;