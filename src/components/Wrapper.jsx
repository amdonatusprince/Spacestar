import React from 'react';
import styled from 'styled-components';
// import { useChat } from '../context/ChatProvider';
import ChatContainer from './ChatContainer';
// import Login from './Login';
import Home from '../pages/Home/Home';
import { useAccount } from 'wagmi';

const WrapperContainer = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;

const Wrapper = () => {
    // const { userName } = useChat();
    const { address, isConnected } = useAccount();

    console.log('account: ', address)

    return (
        <WrapperContainer>
            {
                ! isConnected
                ?
                <Home />
                :
                <ChatContainer />
            }
        </WrapperContainer>
    );
};

export default Wrapper;