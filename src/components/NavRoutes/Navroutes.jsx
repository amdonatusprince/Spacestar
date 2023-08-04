import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Home from '../../pages/Home/Home';
import Soon from '../../pages/Soon/Soon'
import Dashboard from '../Dashboard';
import Navbar from '../Navbar/Navbar';
import Commingsoon from '../ComingSoon/ComingSoon';


const Navroutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='soon' element={<Soon/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/claim' element={<Commingsoon />} />
        {/* <Route path='/navbar' element={<Navbar/>} /> */}
        {/* <Route path='comingsoon2' element={<ComingSoon/>}/> */}
    </Routes>
    </>
  )
}

export default Navroutes