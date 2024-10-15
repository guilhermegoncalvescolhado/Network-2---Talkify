import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import { 
  GlobalContainer, 
  DashboardContainer, 
  LogoImage, 
  Button, 
  RoomsListContainer, 
  RoomBox, 
  ButtonContainer, 
  ChatContainer, 
  ChatFrame 
} from "./style.js";

export const DashboardPage = () => {
  const [roomCount, setRoomCount] = useState(0);
  const [rooms, setRooms] = useState([]);

  const createRoom = () => {
    const receiverName = prompt("Enter the receiver's name:");
    if (receiverName) {
      setRoomCount((prevCount) => prevCount + 1);
      setRooms([...rooms, { id: roomCount + 1, name: receiverName }]);
    }
  };

  const logout = () => {
    alert("Logging out...");
    window.location.href = "/"; // Redireciona para a página inicial após o logout
  };

  return (
    <GlobalContainer>
      <DashboardContainer>
        {/* Logo */}
        <LogoImage src={Logo} alt="Logo" />

        {/* Botão de Criar Sala */}
        <Button onClick={createRoom}>Create Room</Button>

        {/* Lista de Salas */}
        <RoomsListContainer>
          {rooms.map((room) => (
            <RoomBox key={room.id}>
              <Link to={`/chatroom?roomId=${room.id}`} target="chatFrame">
                {room.name}
              </Link>
            </RoomBox>
          ))}
        </RoomsListContainer>

        {/* Botões Inferiores */}
        <ButtonContainer>
          <Link to="/config">
            <Button>Configuration</Button>
          </Link>

          <Link to="/report">
            <Button>Report</Button>
          </Link>

          <Button onClick={logout}>Logout</Button>
        </ButtonContainer>
      </DashboardContainer>

      {/* Chat */}
      <ChatContainer>
        <ChatFrame id="chatFrame" title="chatFrame"></ChatFrame>
      </ChatContainer>
    </GlobalContainer>
  );
};
