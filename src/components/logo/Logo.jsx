import React, { useState } from 'react'
import './Logo.css'
import Hamburger from '../hamburger/Menu'

const Logo = ({ setUserId, userId }) => {
    const [showHamburger, setShowHamburger] = useState(false)

    if(!userId){
        return(
            <div className='logo'>
                <img src='../logo.PNG' alt='logo' className='milediy' />
            </div> 
        )
    }

    if(!showHamburger){
        return(
        <div className='logo'>
            <img src='../logo.PNG' alt='logo' className='milediy' />
            <div onClick={e=>setShowHamburger(true)} className='burgerContainer'>
                <div className='burger'></div>
                <div className='burger'></div>
                <div className='burger'></div>
            </div>
        </div> 
        )
    }
    return (
        <div className='logo'>
            <img src='../logo.PNG' alt='logo' className='milediy' />
            <Hamburger userId={userId} showHamburger={showHamburger} setShowHamburger={setShowHamburger} setUserId={setUserId} />
        </div>
    )
}

export default Logo
