import { Title, Text, SpecialLink } from "./style";
import { FormContainerComponent } from "../../components/FormContainer"
import { FormComponent } from "../../components/Form"
import { InputContainerComponent } from "../../components/InputContainer"
import { GlobalContainerComponent } from "../../components/GlobalContainer";
import { FormInputComponent } from "../../components/FormInput";
import { FormButtonComponent } from "../../components/FormButton"; 
import Logo from "../../images/Logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/Auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("@Talkfy: Token")) || "");

  const { login, authenticate } = useContext(AuthContext);

  useEffect(() => {
    authenticate(token, ()=>{}, false)
  })

  const handleLogin = (event) => {
    event.preventDefault();
    login({email, password}, setToken)
  };
  return (
    <GlobalContainerComponent>
      <img src={Logo} width="400px" alt="Logo" />
      <FormContainerComponent>
      <Title>Login</Title>
      <FormComponent onSubmit={handleLogin}>
        <InputContainerComponent>
          <FormInputComponent type="email" id="loginEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <FormInputComponent type="password" id="loginPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
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