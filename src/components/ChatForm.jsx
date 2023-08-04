import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io';
import { Spinner } from '@chakra-ui/react';
import { ButtonContainer } from '../styled/Button';
import { useChat } from '../context/ChatProvider';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ContractABI } from '../utils/SpacestarABI';

const MessageForm = styled.form`
  padding: 0.5vw 0;
  display: flex;
  align-items: center;
  height: 10%;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  & input {
    flex: 1;
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const ChatForm = () => {
  const inputRef = useRef(null);
  const { currentRoom } = useChat();
  const [chatMessage, setChatMessage] = useState('');

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_CELO_CONTRACT,
    abi: ContractABI,
    functionName: 'sendChatMessage',
    args: [chatMessage, currentRoom?.name],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const onSubmit = (e) => {
    e.preventDefault();

    const message = inputRef.current.value;
    setChatMessage(message);

    inputRef.current.value = '';
    inputRef.current.focus();

    console.log(message);
    if (write) {
      write();
    }
  };

  return (
    <MessageForm onSubmit={onSubmit}>
      <input type="text" placeholder='Share your Story or Contribute here' ref={inputRef} />

      <ButtonContainer flex="0" padding="0" active={true} size="2.2em" borderRadius="50%">
        <button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <Spinner 
            speed='0.65s'
            color='blue'
            size='xl'
          /> : <IoIosSend fill='#fff' />}
        </button>
      </ButtonContainer>
      
    </MessageForm>
  );
};

export default ChatForm;
