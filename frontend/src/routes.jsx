import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/homePage";
import { LoginPage } from "./routes/logIn";
import { RegisterPage } from "./routes/register";
import { DashboardPage } from "./routes/dashboard";

export const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/logIn" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
);
