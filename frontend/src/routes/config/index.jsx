import React from "react";
import { Link } from "react-router-dom";
import {
  GlobalContainer,
  FormContainer,
  Title,
  Form,
  InputContainer,
  Input,
  Button,
  BackButton,
} from "./style";

export const ConfigurationPage = () => {
  const handleEditUser = () => {
    alert("Editing user information...");
    // Lógica para permitir a edição das informações do usuário
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted.");
      // Lógica para deletar a conta
    }
  };

  return (
    <GlobalContainer>
      <FormContainer>
        <Title>Configuration</Title>
        <Form>
          <InputContainer>
            <label>Username:</label>
            <Input type="text" value="John Doe" readOnly />
          </InputContainer>
          <InputContainer>
            <label>Email:</label>
            <Input type="email" value="john.doe@example.com" readOnly />
          </InputContainer>
          <InputContainer>
            <label>Password:</label>
            <Input type="password" value="********" readOnly />
          </InputContainer>
          <InputContainer>
            <label>Profile Picture:</label>
            <Input type="text" value="profile_picture.jpg" readOnly />
          </InputContainer>
          <InputContainer>
            <label>Phone Number:</label>
            <Input type="tel" value="+1234567890" readOnly />
          </InputContainer>
          <InputContainer>
            <label>Date of Birth:</label>
            <Input type="date" value="1990-01-01" readOnly />
          </InputContainer>
          <InputContainer>
            <label>Receive Notifications:</label>
            <Input type="checkbox" checked readOnly />
          </InputContainer>
        </Form>
        <Button onClick={handleEditUser}>Edit</Button>
        <Button onClick={handleDeleteAccount}>Delete Account</Button>
        <Link to="/dashboard">
          <BackButton>Return</BackButton>
        </Link>
      </FormContainer>
    </GlobalContainer>
  );
};
