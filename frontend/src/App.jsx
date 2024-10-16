import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutesComponent } from "./routes";

function App() {
  return (
    <Router>
      <Providers>
        <ToastContainer />
        <RoutesComponent />
        <GlobalStyle />
      </Providers>
    </Router>
  );
}

export default App;
