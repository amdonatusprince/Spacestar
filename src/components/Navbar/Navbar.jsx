import LOGO from '../../assets/LOGO.png';
import ComingSoon from '../../pages/ComingSoon/ComingSoon';
import Button from '../Button/Button';
import design from './navbar.module.css';
import { Link } from 'react-router-dom';
import { LoginButton } from '../../connect-wallet/connectButton';

const Navbar = () => {
  return (
    <>
    <div className={design.Navbar}>
      <img src={LOGO} alt='' />
      <LoginButton />
    {/* <Link to='/soon'>
      <Button  content='Get started'/>
      </Link> */}
    </div>
    </>
  );
};

export default Navbar;
