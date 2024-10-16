import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../images/Logo.png";
import { AuthContext } from "../../providers/Auth";
import { MessageContext } from "../../providers/Messages";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";


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
  padding: 50px 20px 10px ${(props) => (props.isOpen ? "260px" : "20px")};
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
  & > p {
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
`;

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
  background-color: #3d2b5f;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SendButton = styled(IconButton)`
  background-color: #7c5cbf;

  &:hover {
    background-color: #9370db;
  }

  &:active {
    background-color: #6a5acd;
  }
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
`;

const WelcomeContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Arial", sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://www.transparenttextures.com/patterns/diagonal-stripes-light.png")
      repeat;
    opacity: 0.08;
    z-index: 0;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 4em;
  color: #fff;
  text-shadow: 6px 6px 20px rgba(0, 0, 0, 0.8);
  animation: pulse 2s infinite;
  z-index: 1;
  margin-bottom: 20px;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const WelcomeText = styled.p`
  font-size: 1.5em;
  margin-bottom: 40px;
  color: #e0e0e0;
  z-index: 1;
  text-align: center;
`;

const WelcomeLogo = styled.img`
  max-width: 300px;
  margin-bottom: 20px;
  animation: fadeIn 1.5s ease-out;
  z-index: 1;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const StartChatButton = styled.button`
  background-color: #ff5f5f;
  color: white;
  padding: 10px 20px;
  font-size: 1.5em;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: background-color 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  z-index: 1;

  &:hover {
    background-color: #ff4040;
  }
`;

const FloatingCircle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 8s infinite ease-in-out;
  z-index: 0;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }
`;

export const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [chatId, setChatId] = useState();
  const [isPrivate, setIsPrivate] = useState();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("@Talkfy: Token")) || ""
  );
  const [username] = useState(
    JSON.parse(localStorage.getItem("@Talkfy: Username")) || ""
  );
  console.log(messages);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const nav = useNavigate();
  const { authenticate } = useContext(AuthContext);
  const { conversationsList, getOneChat, createMessage } = useContext(MessageContext);

  useEffect(() => {
    authenticate(token, () => {}, true);
    conversationsList(token, setConversations);
  }, [authenticate, conversationsList, token]);

  const loggout = () => {
    setToken("");
    nav("/");
    localStorage.removeItem("@Talkfy: Token");
  };

  const selectChat = (chatId, type, name) => {
    getOneChat(token, chatId, type === "private", setMessages);
    setName(name);
    setChatId(chatId);
    setIsPrivate(type === "private")
  };

  const sendMessage = () => {
    isPrivate ? createMessage(token, {
      recipient: chatId,
      content: message,
      isPrivate
    }) : createMessage(token, {
      chatRoom: chatId,
      content: message,
      isPrivate

    })
    setMessage("")
    
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
          {conversations?.map((chat) => (
            <p
              key={chat.id}
              onClick={() =>
                selectChat(chat.id.split("_")[1], chat.type, chat.name)
              }
            >
              {chat.name}
            </p>
          ))}
        </RoomsList>
        <Button style={{ marginTop: "auto" }}>Configuration</Button>
        <Button>Report</Button>
        <Button onClick={(e) => loggout()}>Logout</Button>
      </Sidebar>
      <MainContent isOpen={isSidebarOpen}>
        {messages && name ? (
          <>
            <UserInfo>
              <h2>{name}</h2>
            </UserInfo>
            <MessageContainer>
              {messages.map((message) => {
                return message.sender.username === username ? (
                  <SentMessage key={message.id}>{message.content}</SentMessage>
                ) : (
                  <RecivedMessage key={message.id}>
                    {message.content}
                  </RecivedMessage>
                );
              })}
            </MessageContainer>
            <InputContainer>
              <Input placeholder="Type your message here" value={message} onChange={(e)=>{
                e.preventDefault();
                setMessage(e.target.value);
              }} onKeyDown={(e)=>{if(e.key === "enter") sendMessage()}}/>
              <IconButton aria-label="Report">
                <FiAlertTriangle size={20}/>
              </IconButton>
              <SendButton aria-label="Send message" onClick={(e)=>{sendMessage()}}>
                <IoIosSend size={20}/>
              </SendButton>
            </InputContainer>
          </>
        ) : (
          <WelcomeContent>
            <WelcomeLogo src={Logo} alt="Logo" />
            <WelcomeTitle>Welcome, {username}!</WelcomeTitle>
            <WelcomeText>
              We're glad to have you here. Let's start chatting!
            </WelcomeText>
            <StartChatButton onClick={() => {}}>Start Chat</StartChatButton>
            <FloatingCircle
              style={{
                width: "200px",
                height: "200px",
                bottom: "10%",
                left: "5%",
              }}
            />
            <FloatingCircle
              style={{
                width: "250px",
                height: "250px",
                top: "15%",
                right: "10%",
              }}
            />
            <FloatingCircle
              style={{
                width: "150px",
                height: "150px",
                bottom: "20%",
                right: "15%",
              }}
            />
          </WelcomeContent>
        )}
      </MainContent>
    </AppContainer>
  );
};
