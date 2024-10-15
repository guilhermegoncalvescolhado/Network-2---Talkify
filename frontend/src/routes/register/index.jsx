import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContainer, InputContainer, Input, Button, Title, Text } from "./style.js";
import Logo from "../../images/Logo.png";

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
      <img src={Logo} alt="Logo" />
      <Title>Registrar</Title>
      <form onSubmit={handleRegister}>
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
      </form>
      <Text>
        Já tem uma conta?{" "}
        <Link to="/login" className="button">Faça login aqui</Link>
      </Text>
      <Link to="/">
        <Button className="back-button">Voltar para a Home</Button>
      </Link>
    </GlobalContainer>
  );
};
