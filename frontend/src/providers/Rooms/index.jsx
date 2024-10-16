import { createContext, useCallback } from "react";
import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const createChatRoom = useCallback((token, data, callback, setChatId) => {
    console.log(data);
    Api.post("/rooms/create-chat", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        toast.success("Room created successfully");
        callback(response.data._id, null, data.name);
        setChatId(response.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllChatRooms = useCallback((token, setRooms) => {
    Api.get("/rooms", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        setRooms(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <RoomContext.Provider value={{ createChatRoom, getAllChatRooms }}>
      {children}
    </RoomContext.Provider>
  );
};
