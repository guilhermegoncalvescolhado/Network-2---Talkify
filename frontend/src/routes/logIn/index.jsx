import { GlobalContainer, Image, Title, Form, InputContainer, Input, Button, Text, SpecialLink, FormContainer, ButtonHome } from "./style";
import Logo from "../../images/Logo.png";

export const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {
      alert("Login successful");
      window.location.href = "Dashboard.html"; 
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <GlobalContainer>
      <Image src={Logo} alt="Logo" />
      <FormContainer>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <InputContainer>
          <Input type="email" id="loginEmail" placeholder="Email" required />
          <Input type="password" id="loginPassword" placeholder="Password" required />
        </InputContainer>
        <Button type="submit">Login</Button>
      </Form>
      <ButtonHome as="a" href="/" className="back-button">
        Back to Home
      </ButtonHome>
      <Text>
        Don't have an account? <SpecialLink href="/register">Register here</SpecialLink>
      </Text>
      </FormContainer>
    </GlobalContainer>
  );
};