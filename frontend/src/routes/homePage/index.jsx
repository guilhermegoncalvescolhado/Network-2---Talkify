import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import { Button, ButtonContainer, Container, Image, Paragraph, Slogan, SpecialLetter, Title } from "./style.js";

export const HomePage = () => {
  return (
    <Container>
      <Image src={Logo} alt="Logo" />

      <Title>Welcome to Talkify</Title>
      <Slogan>Your chatting app that grants safety :)</Slogan>
      <Paragraph>
        <SpecialLetter>Log in</SpecialLetter> or <SpecialLetter>Register</SpecialLetter> to start chatting with others.
      </Paragraph>

      <ButtonContainer>
        <Link to="/login">
          <Button> 
            Login
          </Button>
        </Link>

        <Link to="/register">
          <Button> 
            Register
          </Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};
