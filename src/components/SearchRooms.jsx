import React from 'react';
import { BiReset } from 'react-icons/bi';
import styled from 'styled-components';
import { ButtonContainer } from '../styled/Button';
import { LoginButton } from '../connect-wallet/connectButton';

const SearchRoomsContainer = styled.div`
    display: flex;
    background: #fff;
    width: 45%;
    padding-left: 1.2em;
    border-radius: 1.2em;

    & input {
        width: 85%;
        background: transparent;
        border: none;
    }

    @media (max-width: 820px) {
        display: none;
    }
`;

const RightAlignedDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const SearchRooms = ({ query, setQuery }) => { 
    return (
        
        <SearchRoomsContainer>

            <input type="text" placeholder='Search Group' value={ query } onChange={(e) => setQuery(e.target.value) } />
            
            <ButtonContainer padding="0" active={ true } size="3em" borderRadius="1.1em">
                <a href='#'>
                    <BiReset fill='194185' size={ '1.5em' }></BiReset>
                </a>
            </ButtonContainer>
        </SearchRoomsContainer>
    );
};

export default SearchRooms;