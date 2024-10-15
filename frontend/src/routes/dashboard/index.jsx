import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #2d1b4e;
  color: white;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1a0f2e;
  padding: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
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
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const MessageContainer = styled.div`
  background-color: #3d2b5f;
  padding: 10px;
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

export const DashboardPage = () => {
  return (
    <AppContainer>
      <Sidebar>
        <Logo>
          TALKIFY
        </Logo>
        <Button>Create Room</Button>
        <RoomsList>
          <h3>Rooms List</h3>
          {Array(10).map(()=> <p>Guilherme</p>)}
        </RoomsList>
        <Button style={{ marginTop: 'auto' }}>Configuration</Button>
        <Button>Report</Button>
        <Button>Logout</Button>
      </Sidebar>
      <MainContent>
        <UserInfo>
          <h2>JANE DOE</h2>
        </UserInfo>
        <MessageContainer>
          {/* Replace with actual message content */}
          {Array(5).fill('F').join('')}
        </MessageContainer>
        <MessageContainer>
          {/* Replace with actual message content */}
          {Array(3).fill('F').join('')}
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

