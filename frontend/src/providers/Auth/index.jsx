import { createContext } from "react";
import { Api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const register = (data, setToken) => {
    Api.post("/user/register", data)
      .then((response) => {
        toast.success("User registered successfully!");
        localStorage.setItem(
          "@Talkfy: Token",
          JSON.stringify(response.data.token)
        );
        setToken(response.data.token);
        nav("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const login = (data, setToken) => {
    Api.post("/user/login", data)
      .then((response) => {
        localStorage.setItem(
          "@Talkfy: Token",
          JSON.stringify(response.data.token)
        );
        console.log(response);
        setToken(response);
        toast.success("Wellcome back!!");
        nav("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const authenticate = (token, setLoad, pageLoged) => {
    console.log(token);
    Api.get("/user/auth", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        setLoad(true);
        if (!pageLoged) {
          nav("/dashboard");
        }
      })
      .catch((err) => {
        if (pageLoged) {
          nav("/");
          localStorage.removeItem("@Talkfy: Token");
          console.log(err);
          toast.error("You don't have access to this page.");
        }
      });
  };

  return (
    <AuthContext.Provider value={{ register, login, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};
