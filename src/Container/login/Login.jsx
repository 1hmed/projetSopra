import "./login.css";
import styled from "styled-components";
import { AccountBox } from "../../Components/login/accountBox";
import bg from '../../img/bg.jpg';

const AppContainer = styled.div`
  width: 200%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
`;

function Login() {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}

export default Login;