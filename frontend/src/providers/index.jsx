import { AuthProvider } from "./Auth";
import { MessageProvider } from "./Messages";
import { RequestProvider } from "./Requests";
import { RoomProvider } from "./Rooms";
import { WebSocketProvider } from "./WebSocket";

export const Providers = ({ children }) => {
  return (
    <WebSocketProvider>
      <AuthProvider>
        <RoomProvider>
          <RequestProvider>
            <MessageProvider>{children}</MessageProvider>
          </RequestProvider>
        </RoomProvider>
      </AuthProvider>
    </WebSocketProvider>
  );
};
