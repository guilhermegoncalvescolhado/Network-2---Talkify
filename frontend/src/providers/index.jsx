import { AuthProvider } from "./Auth";
import { MessageProvider } from "./Messages";

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <MessageProvider>{children}</MessageProvider>
    </AuthProvider>
  );
};
