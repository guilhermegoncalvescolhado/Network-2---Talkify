import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../images/Logo.png";
import { AuthContext } from "../../providers/Auth";
import { MessageContext } from "../../providers/Messages";
import { useNavigate } from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #2d1b4e;
  color: white;
`;

const Sidebar = styled.div`
  position: fixed;
  height: 100vh;
  left: ${(props) => (props.isOpen ? "0" : "-290px")};
  width: 250px;
  background-color: #1a0f2e;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50px 20PX 10PX ${(props) => (props.isOpen ? "260px" : "20px")};;
  transition: all 0.3s ease-in-out;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #3d2b5f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RoomsList = styled.div`
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &>p{
    background-color: #3d2b5f6e;
    padding: 5px 20px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const RecivedMessage = styled.div`
  background-color: #551ebc89;
  padding: 10px;
  align-self: flex-start;
  max-width: 60%;
  width: max-content;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const SentMessage = styled.div`
  background-color: #1b083f89;
  padding: 10px;
  align-self: flex-end;
  
  max-width: 60%;
  width: max-content;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  background-color: #3d2b5f;
  color: white;
  border: none;
  border-radius: 5px 0 0 5px;
`;

const SendButton = styled(Button)`
  width: auto;
  border-radius: 0 5px 5px 0;
  margin-bottom: 0;
`;

const ToggleSidebarButton = styled.button`
  position: absolute;
  top: 5px;
  left: ${(props) => (props.isOpen ? "200px" : "10px")};
  background-color: #3d2b5f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: left 0.3s ease-in-out;
`;

const Image = styled.img`
  width: 165px;
  margin-bottom: 20px;
`

export const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("@Talkfy: Token")) || "");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const nav = useNavigate()
  const { authenticate } = useContext(AuthContext);
  const { conversationsList } = useContext(MessageContext);

  useEffect(() => {
    authenticate(token, ()=>{}, true)
    conversationsList(token, setConversations)
  }, [token])

  const loggout = () => {
    setToken("")
    nav('/')
    localStorage.removeItem("@Talkfy: Token")
  }

  return (
    <AppContainer>
      <ToggleSidebarButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
        {isSidebarOpen ? <p>X</p> : <p>M</p>}
      </ToggleSidebarButton>

      <Sidebar isOpen={isSidebarOpen}>
        <Image src={Logo} alt="Logo" />
        <Button>Create Room</Button>
        <RoomsList>
          <h3>Rooms List</h3>
          {conversations?.map((chat)=><p key={chat.id}>{chat.name}</p>)}
        </RoomsList>
        <Button style={{ marginTop: "auto" }}>Configuration</Button>
        <Button>Report</Button>
        <Button onClick={(e) => loggout()} >Logout</Button> 
      </Sidebar>
      <MainContent isOpen={isSidebarOpen}>
        <UserInfo>
          <h2>JANE DOE</h2>
        </UserInfo>
        <MessageContainer>
          <RecivedMessage>
            {/* Replace with actual message content */}
            {Array(5).fill("F").join("")}
          </RecivedMessage>
          <SentMessage>
            {/* Replace with actual message content */}
            {Array(3).fill("F").join("")}
          </SentMessage>
        </MessageContainer>
        <InputContainer>
          <Input placeholder="Type your message here" />
          <SendButton>Send</SendButton>
          <SendButton>Report</SendButton>
        </InputContainer>
      </MainContent>
    </AppContainer>
  );
};
