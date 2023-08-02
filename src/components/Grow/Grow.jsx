import RIGHT from '../../assets/grow_img.png';
import STAR from '../../assets/starz.png';
import Button from '../Button/Button';
import design from './grow.module.css';
import { Link } from 'react-router-dom';


const Grow = () => {
  return (
    <div className={`${design.Grow} `}>
      <div className={design.Grow2}>

        <div className={design.Grow_left}>
          <img src={STAR} alt='' />
          <p>Trusted by 3456+ users worldwide</p>
          <div className={design.Grow_left_middle}>
            <h1>
              Share Your Story with <span>Spacestar</span>{' '}
            </h1>
            <p>
            A safe haven where you can freely share your thoughts, emotions, and experiences, knowing that you are not alone.
            </p>
          </div>
          <div className={design.Navbar}>
          <Link to='/soon'>
            <Button  content='Get started'/>
          </Link>
          </div>

        </div>
        <div className={design.Grow_right}>
          <img src={RIGHT} alt='' />
        </div>
        {' '}
      </div>
    </div>
  );
};

export default Grow;
