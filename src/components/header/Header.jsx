import React from 'react'
import Link from '../Link'
import './Header.css'

const Header = ({ setUserId, userId }) => {

    if(!userId){
        return(
            <div className='header'>
            <Link href='/' className='item'>
                Home
            </Link>
            <Link href='/trips' className='item'>
                Trips
            </Link>
            <Link href='/gasStation' className='item'>
                Gas
            </Link>
        </div>
        )
    }
    return (
        <div className='header'>
            <Link href='/' className='item'>
                Home
            </Link>
            <Link href='/trips' className='item'>
                Trips
            </Link>
            <Link href='/gasStation' className='item'>
                Gas
            </Link>
            <a href='/' onClick={e=>setUserId(null)}>Logout</a>
        </div>
    )
}

export default Header
