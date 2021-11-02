import React from 'react'
import Link from '../Link'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <Link href='/' className='item'>
                Home
            </Link>
            <Link href='/trips' className='item'>
                Trips
            </Link>
            <Link href='/gasStation' className='item'>
                Gas Stations
            </Link>
        </div>
    )
}

export default Header
