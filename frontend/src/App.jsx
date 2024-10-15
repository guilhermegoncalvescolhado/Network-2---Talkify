import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { HomePage } from "./routes/homePage";
import { LoginPage } from "./routes/logIn";
import { RegisterPage } from "./routes/register";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/logIn" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
