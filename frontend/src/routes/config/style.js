import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import {
  GlobalContainer,
  FormContainer,
  Image,
  Title,
  Form,
  InputContainer,
  Input,
  Button,
  Text,
  SpecialLink,
} from "./style";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("Registro realizado com sucesso!");
    // Aqui você pode adicionar lógica de redirecionamento ou integração com API.
  };

  return (
    <GlobalContainer>
      <Image src={Logo} alt="Logo" />
      <FormContainer>
        <Title>Registrar</Title>
        <Form onSubmit={handleRegister}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputContainer>
          <Button type="submit">Registrar</Button>
        </Form>
        <Text>
          Já tem uma conta? <SpecialLink as={Link} to="/login">Faça login aqui</SpecialLink>
        </Text>
        <Link to="/">
          <Button>Voltar para a Home</Button>
        </Link>
      </FormContainer>
    </GlobalContainer>
  );
};
