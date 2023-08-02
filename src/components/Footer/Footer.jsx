import React from 'react'
import design from './footer.module.css'
import Button from '../Button/Button'
import Logo from '../../assets/LOGO.png'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
    <div className={design.footercontainer}>
        <div className={design.footersection1}>
            <div >
                <img src={Logo} alt="" />
            </div>
            <div className={design.footerCTA}>
                <p>
                    Start connecting today
                </p>
                <Link to='/soon'>
                <Button content='Get Started'/>
                </Link>
            </div>
        </div>

        <div className={design.footerdivider}>
        </div>

        <div className={design.footersection2}> 
            <div className={design.icons}>
                <FaFacebook/>
                <FaTwitter/>
                <FaInstagram/>
                <FaLinkedin/>
            </div>
            <div className={design.footertext}>
                <p>
                    Terms of Service
                </p>
                <p>
                    Privacy Policy
                </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer