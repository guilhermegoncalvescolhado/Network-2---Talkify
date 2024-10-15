import { 
  GlobalContainer, 
  ReceiverTitle, 
  MessageContainer, 
  Message, 
  InputContainer, 
  TextArea, 
  SendButton, 
  ReportButton 
} from "./style.js";

export const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, messageInput]);
      setMessageInput(""); // Limpar o campo de entrada após o envio
    }
  };

  const reportMessage = () => {
    alert("Report submitted!"); // Mensagem de confirmação
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Permitir quebra de linha ao pressionar Shift + Enter
        event.preventDefault();
        setMessageInput((prev) => prev + '\n'); // Adicionar uma nova linha
      } else {
        // Enviar mensagem ao pressionar apenas Enter
        event.preventDefault(); // Evita a quebra de linha padrão
        sendMessage();
      }
    }
  };

  return (
    <GlobalContainer>
      <ReceiverTitle>
        <h1>Jane Doe</h1>
      </ReceiverTitle>

      <MessageContainer id="messageContainer">
        {messages.map((msg, index) => (
          <Message key={index}>{msg}</Message>
        ))}
      </MessageContainer>

      <InputContainer>
        <TextArea 
          id="messageInput" 
          placeholder="Type your message here" 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)} 
          onKeyPress={handleKeyPress} 
          required
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
        <ReportButton onClick={reportMessage}>Report</ReportButton>
      </InputContainer>
    </GlobalContainer>
  );
};
