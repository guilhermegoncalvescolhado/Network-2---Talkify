import React, { useContext, useState } from "react";
import { Title, Text, SpecialLink } from "./style.js";
import { FormContainerComponent } from "../../components/FormContainer"
import { FormComponent } from "../../components/Form"
import { GlobalContainerComponent } from "../../components/GlobalContainer";
import { InputContainerComponent } from "../../components/InputContainer"
import { FormInputComponent } from "../../components/FormInput/index.jsx"; 
import { FormButtonComponent } from "../../components/FormButton/index.jsx";
import Logo from "../../images/Logo.png";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/Auth/index.jsx";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("The two passowrds must be equal.")
      return;
    } else {
      register({username, email, password})
    }
  };

  return (
    <GlobalContainerComponent>
      <img src={Logo} width="400px" alt="Logo" />
      <FormContainerComponent>

        <Title>Register</Title>
        <FormComponent onSubmit={handleRegister}>
          <InputContainerComponent>
            <FormInputComponent
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FormInputComponent
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInputComponent
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormInputComponent
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputContainerComponent>
          <FormButtonComponent type="submit">Registrar</FormButtonComponent>
        </FormComponent>
          <FormButtonComponent as="a" href="/">Back to Home</FormButtonComponent>
        <Text>
          Already have an account?{" "}
          <SpecialLink href="/login">Log In here</SpecialLink>
        </Text>

      </FormContainerComponent>
    </GlobalContainerComponent>
  );
};
