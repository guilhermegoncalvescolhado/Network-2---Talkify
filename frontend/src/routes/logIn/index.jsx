import { Title, Text, SpecialLink } from "./style";
import { FormContainerComponent } from "../../components/FormContainer"
import { FormComponent } from "../../components/Form"
import { InputContainerComponent } from "../../components/InputContainer"
import { GlobalContainerComponent } from "../../components/GlobalContainer";
import { FormInputComponent } from "../../components/FormInput";
import { FormButtonComponent } from "../../components/FormButton"; 
import Logo from "../../images/Logo.png";

export const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <GlobalContainerComponent>
      <img src={Logo} width="400px" alt="Logo" />
      <FormContainerComponent>
      <Title>Login</Title>
      <FormComponent onSubmit={handleLogin}>
        <InputContainerComponent>
          <FormInputComponent type="email" id="loginEmail" placeholder="Email" required />
          <FormInputComponent type="password" id="loginPassword" placeholder="Password" required />
        </InputContainerComponent>
        <FormButtonComponent type="submit">Login</FormButtonComponent>
      </FormComponent>
      <FormButtonComponent as="a" href="/" className="back-button">
        Back to Home
      </FormButtonComponent>
      <Text>
        Don't have an account? <SpecialLink href="/register">Register here</SpecialLink>
      </Text>
      </FormContainerComponent>
    </GlobalContainerComponent>
  );
};