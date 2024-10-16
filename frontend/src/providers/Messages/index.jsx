import { createContext } from "react";
import { Api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const nav = useNavigate();

  const createMessage = (token, data) => {
    Api.post("/message/", data,{
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const conversationsList = (token, setConversations) => {
    Api.get("/message/lastConversations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setConversations(response.data)
      })
      .catch((err) => {
        nav("/");
        localStorage.removeItem("@Talkfy: Token");
        console.log(err);
        toast.error("You don't have access to this page.");
      });
  };

  const getOneChat = (token, chatId, isPrivate, setMessages) => {
    if(isPrivate){
      Api.get("/message/private/"+chatId, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          setMessages(response.data)
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      Api.get("/message/chatroom/"+chatId, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          setMessages(response.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <MessageContext.Provider value={{ conversationsList, getOneChat, createMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
