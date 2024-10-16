import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../images/Logo.png";
import { AuthContext } from "../../providers/Auth";
import { MessageContext } from "../../providers/Messages";
import { useNavigate } from "react-router-dom";
import {
  FiAlertTriangle,
  FiMail,
  FiUsers,
  FiBell,
  FiPlus,
} from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { WebSocketContext } from "../../providers/WebSocket";
import { RoomContext } from "../../providers/Rooms";
import { RequestContext } from "../../providers/Requests";

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
  overflow-y: scroll;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const SenderName = styled.span`
  font-size: 0.8em;
  color: #a0a0a0;
  margin-bottom: 2px;
`;

const RecivedMessage = styled.div`
  background-color: #551ebc89;
  padding: 10px;
  align-self: flex-start;
  max-width: 60%;
  width: max-content;
  border-radius: 5px;
`;

const SentMessage = styled.div`
  background-color: #1b083f89;
  padding: 10px;
  align-self: flex-end;
  max-width: 60%;
  width: max-content;
  border-radius: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: #3d2b5f;
  border-radius: 25px;
  padding: 5px;
  padding-left: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
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

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideDownInput = styled.div`
  background-color: #5f4378;
  height: ${(props) => (props.isOpen ? "40px" : "0")};
  overflow: hidden;
  margin-bottom: 10px;
  margin-top: -10px;
  width: 95%;
  border-radius: 0 0 10px 10px;
  align-self: center;
  transition: height 0.3s ease-in-out;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #2d1b4e;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
`;

const SearchInput = styled(Input)`
  margin-bottom: 20px;
`;

const GroupList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const GroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #3d2b5f;
`;

const RequestButton = styled.button`
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
  position: relative;
`;

const RequestBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff5f5f;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
`;

const RequestItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #3d2b5f;
`;

const RequestActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPrivateChatInputOpen, setIsPrivateChatInputOpen] = useState(false);
  const [privateEmail, setPrivateEmail] = useState("");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupSearch, setGroupSearch] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [isCreateRoomInputOpen, setIsCreateRoomInputOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [groupRequests, setGroupRequests] = useState([]);

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("@Talkfy: Token")) || ""
  );
  const [username] = useState(
    JSON.parse(localStorage.getItem("@Talkfy: Username")) || ""
  );

  const nav = useNavigate();
  const { authenticate } = useContext(AuthContext);
  const { conversationsList, getOneChat, createMessage, createPrivateMessage } =
    useContext(MessageContext);
  const { socket } = useContext(WebSocketContext);
  const { createChatRoom, getAllChatRooms } = useContext(RoomContext);
  const { joinChatRoom, getAllJoinRequest, approveJoinRequest, rejectJoinRequest } = useContext(RequestContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    authenticate(token, () => {}, true);
    conversationsList(token, setConversations);
    getAllChatRooms(token, setAllGroups);
  }, [authenticate, conversationsList, getAllChatRooms, token]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.message === "Nova mensagem") {
          getOneChat(token, chatId, isPrivate, setMessages);
          conversationsList(token, setConversations);
        }
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.message === "Nova sala criada" || data.message === "Sala de chat atualizada" || data.message === "Sala apagada") {
          getAllChatRooms(token, setAllGroups);
          conversationsList(token, setConversations);
        }
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.message === "Usuário quer entrar na sala ") {
          getAllJoinRequest(token, chatId, setGroupRequests);
          conversationsList(token, setConversations);
        }
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.message === "Pedido para entrar na sala aceito" || data.message === "Pedido rejeitado com sucesso") {
          getAllChatRooms(token, setAllGroups);
          conversationsList(token, setConversations);
        }
      };
    }
  }, [socket, chatId, isPrivate, getOneChat, token, conversationsList, getAllJoinRequest, getAllChatRooms]);

  const loggout = useCallback(() => {
    setToken("");
    nav("/");
    localStorage.removeItem("@Talkfy: Token");
  }, [nav]);

  const selectChat = useCallback(
    (chatId, type, name) => {
      getOneChat(token, chatId, type === "private", setMessages);
      setName(name);
      setChatId(chatId);
      setIsPrivate(type === "private");
    },
    [getOneChat, token]
  );

  const sendMessage = useCallback(() => {
    const messageData = isPrivate
      ? { recipient: chatId, content: message, isPrivate }
      : { chatRoom: chatId, content: message, isPrivate };

    createMessage(token, messageData);
    setMessage("");
  }, [isPrivate, chatId, message, createMessage, token]);

  const sendPrivateMessage = useCallback(() => {
    createPrivateMessage(token, { email: privateEmail });
    setMessage("");
  }, [privateEmail, createPrivateMessage, token]);


  const openGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const requestToJoinGroup = (groupId) => {
    joinChatRoom(token, groupId)
  };

  const filteredGroups = allGroups.filter((group) =>
    group.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const openRequestModal = () => {
    setIsRequestModalOpen(true);
    getAllJoinRequest(token, chatId, setGroupRequests)
  };
  console.log(groupRequests)
  const handleRequest = (requestId, action) => {
    if (action === 'accept'){
      approveJoinRequest(token, requestId)
    } else {
      rejectJoinRequest(token, requestId);
    }
    console.log(`Request ${requestId} ${action}`);
    // Remove the request from the list
    setGroupRequests(
      groupRequests.filter((request) => request.id !== requestId)
    );
  };

  const createRoom = () => {
    createChatRoom(token, {name: roomName}, selectChat, setChatId);
    setIsCreateRoomInputOpen(false);
    setRoomName("");
  };

  return (
    <AppContainer>
      <ToggleSidebarButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
        {isSidebarOpen ? <p>X</p> : <p>M</p>}
      </ToggleSidebarButton>

      <Sidebar isOpen={isSidebarOpen}>
        <Image src={Logo} alt="Logo" />
        <ActionButton
          onClick={() => setIsCreateRoomInputOpen(!isCreateRoomInputOpen)}
        >
          <FiPlus /> Create Room
        </ActionButton>
        <SlideDownInput isOpen={isCreateRoomInputOpen}>
          <Input
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createRoom()}
          />
        </SlideDownInput>
        <ActionButton
          onClick={() => setIsPrivateChatInputOpen(!isPrivateChatInputOpen)}
        >
          <FiMail /> Start Private Chat
        </ActionButton>
        <SlideDownInput isOpen={isPrivateChatInputOpen}>
          <Input
            placeholder="Enter email"
            value={privateEmail}
            onChange={(e) => setPrivateEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendPrivateMessage()}
          />
        </SlideDownInput>
        <ActionButton onClick={openGroupModal}>
          <FiUsers /> Join a Group
        </ActionButton>
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
        <Button onClick={()=>loggout()}>Logout</Button>
      </Sidebar>

      <MainContent isOpen={isSidebarOpen}>
        {messages && name ? (
          <>
            <UserInfo>
              <h2>{name}</h2>
              {
                !isPrivate &&
                <RequestButton onClick={openRequestModal}>
                  <FiBell />
                  <RequestBadge>{groupRequests.length}</RequestBadge>
                </RequestButton>
              }
            </UserInfo>
            <MessageContainer>
              {messages.map((message) => {
                const isSentByUser = message.sender.username === username;
                return (
                  <MessageWrapper
                    key={message.id}
                    style={{
                      alignItems: isSentByUser ? "flex-end" : "flex-start",
                    }}
                  >
                    {!isSentByUser && !message.isPrivate && (
                      <SenderName>{message.sender.username}</SenderName>
                    )}
                    {isSentByUser ? (
                      <SentMessage>{message.content}</SentMessage>
                    ) : (
                      <RecivedMessage>{message.content}</RecivedMessage>
                    )}
                  </MessageWrapper>
                );
              })}
            </MessageContainer>

            <InputContainer>
              <Input
                placeholder="Type your message here"
                value={message}
                onChange={(e) => {
                  e.preventDefault();
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <IconButton aria-label="Report">
                <FiAlertTriangle size={20} />
              </IconButton>
              <SendButton aria-label="Send message" onClick={sendMessage}>
                <IoIosSend size={20} />
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
      {isRequestModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Group Join Requests</h2>
            {groupRequests.map((request) =>{
              console.log(request)
              return (
                <RequestItem key={request.id}>
                  <span>{request.requester.email}</span>
                  <RequestActions>
                    <Button onClick={() => handleRequest(request._id, "accept")}>
                      Accept
                    </Button>
                    <Button onClick={() => handleRequest(request._id, "decline")}>
                      Decline
                    </Button>
                  </RequestActions>
                </RequestItem>
              )
            } 
            )}
            <Button onClick={() => setIsRequestModalOpen(false)}>Close</Button>
          </ModalContent>
        </Modal>
      )}
      {isGroupModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Join a Group</h2>
            <SearchInput
              placeholder="Search groups"
              value={groupSearch}
              onChange={(e) => setGroupSearch(e.target.value)}
            />
            <GroupList>
              {filteredGroups.map((group) => 
              {console.log(group)
                return (
                <GroupItem key={group._id}>
                  <span style={{flex: 1}}>{group.name}</span>
                  <Button style={{width: "max-content"}} onClick={() => requestToJoinGroup(group._id)}>
                    Request to Join
                  </Button>
                </GroupItem>
              )}
              )}
            </GroupList>
            <Button onClick={() => setIsGroupModalOpen(false)}>Close</Button>
          </ModalContent>
        </Modal>
      )}
    </AppContainer>
  );
};
