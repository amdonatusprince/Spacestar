import React from 'react'
import { Route,Routes} from 'react-router-dom'
import ComingSoon from '../../pages/ComingSoon/ComingSoon';
import Home from '../../pages/Home/Home';
import Soon from '../../pages/Soon/Soon'


const Navroutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='soon' element={<Soon/>}/>
        {/* <Route path='comingsoon2' element={<ComingSoon/>}/> */}
    </Routes>
    </>
  )
}

export default Navroutes