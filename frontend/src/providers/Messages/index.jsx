import { createContext } from "react";
import { Api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const nav = useNavigate();

  const conversationsList = (token, setConversations) => {
    console.log(token);
    Api.get("/message/lastConversations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        setConversations(response.data)
      })
      .catch((err) => {
        nav("/");
        localStorage.removeItem("@Talkfy: Token");
        console.log(err);
        toast.error("You don't have access to this page.");
      });
  };

  const getOneChat = (token, chatId, isPrivate) => {
    if(isPrivate){

    } else {
      Api.get("/message/chatroom/"+chatId, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
        })
    }
  }

  return (
    <MessageContext.Provider value={{ conversationsList }}>
      {children}
    </MessageContext.Provider>
  );
};
