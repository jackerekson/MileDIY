import React from 'react'
import Header from '../header/Header'
import './Menu.css'

const Menu = ({ showHamburger, setShowHamburger, userId }) => {
    

    return (
        <div className='modal' onClick={e => setShowHamburger(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <Header userId={userId} />
                </div>
            </div>
        </div>
    )
}

export default Menu
