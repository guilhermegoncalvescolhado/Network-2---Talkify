import { createContext, useCallback } from "react";
import { Api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const nav = useNavigate();

  const createPrivateMessage = useCallback((token, data) => {
    console.log(data)
    Api.post("/message/private", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createMessage = useCallback((token, data) => {
    Api.post("/message/", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const conversationsList = useCallback((token, setConversations) => {
    Api.get("/message/lastConversations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setConversations(response.data);
      })
      .catch((err) => {
        nav("/");
        localStorage.removeItem("@Talkfy: Token");
        console.log(err);
        toast.error("You don't have access to this page.");
      });
  }, [nav]);

  const getOneChat = useCallback((token, chatId, isPrivate, setMessages) => {
    const endpoint = isPrivate ? `/message/private/${chatId}` : `/message/chatroom/${chatId}`;
    Api.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MessageContext.Provider value={{ conversationsList, getOneChat, createMessage, createPrivateMessage }}>
      {children}
    </MessageContext.Provider>
  );
};