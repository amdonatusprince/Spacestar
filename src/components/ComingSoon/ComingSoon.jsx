import React from 'react'
import comingsoon from '../../assets/comingsoon.png'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import './ComingSoon.module.css'
import { useContractRead } from 'wagmi'
import {ContractABI} from '../../utils/SpacestarABI'
import { useAccount } from 'wagmi';

const Commingsoon = () => {

    const { address } = useAccount();

    const { data } = useContractRead({
        address: import.meta.env.VITE_CELO_CONTRACT,
        abi: ContractABI,
        functionName: 'userPoints',
        args: [address],
    
      });

  return (
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      {/* <div className='commingsoon-container'>
        <img src={comingsoon} 
        alt="Coming soon page image" 
        style={{
            width: '30%',
          }}
          />
      </div> */}
      <h3 style={{marginBottom: '20px'}}>
        Congratulation!!! You've earned: <b>{Number(data)}</b> Spacestar Points
      </h3>
      <p style={{marginBottom: '20px'}}>
        You'll be able to swap your Spacestar point to $SPACESTAR community Token upon our Mainnet Launch <br /> 
        For now keep contributing and keep earning those point incentive.
      </p>
      <Link to='/dashboard'>
      <div className='commingsoon-btn'>
        <Button content='Back To Dashboard'/>
      </div>
      </Link>
    </div>
  )
}

export default Commingsoon