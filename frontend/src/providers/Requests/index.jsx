import { createContext, useCallback } from "react";
import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const RequestContext = createContext();

export const RequestProvider = ({children}) => {

    const getAllJoinRequest = useCallback((token, chatRoomId, setRequests) => {
        Api.get(`/request/${chatRoomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            console.log(response);
            setRequests(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    const joinChatRoom = useCallback((token, chatRoomId) => {
        Api.post(`/rooms/join-chat/${chatRoomId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            console.log('Solicitação enviada com sucesso:', response.data);
            toast.success('Solicitação enviada!');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Erro ao enviar a solicitação.');
          });
    }, []);


    const approveJoinRequest = useCallback((token, requestId) => {
        Api.post(`/request/approve/${requestId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            console.log('Aprovado:', response.data);
            toast.success('Aprovado!');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Erro ao enviar a solicitação.');
          });
    }, []);


    const rejectJoinRequest = useCallback((token, chatRoomId) => {
        Api.post(`/request/reject/${chatRoomId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            console.log('Rejeitado: ', response.data);
            toast.success('Rejeitado com successo!');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Erro ao enviar a solicitação.');
          });
    }, []);
    return (
        <RequestContext.Provider value ={{
            joinChatRoom,
            approveJoinRequest,
            rejectJoinRequest,
            getAllJoinRequest
        }}>{children}</RequestContext.Provider>
    );
};