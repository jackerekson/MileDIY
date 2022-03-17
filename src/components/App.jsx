import React, { useState } from 'react'
import Gas from '../api/Gas'
import Dropdown from './Dropdown'
import Geolocation from '../api/Geolocation'
import Trip from './trip/Trip'
import Map from '../api/Map'
import LoginReq from '../api/login/LoginReq'
import Route from './Route'
import Logo from './logo/Logo'
import About from './About'
import './App.css'

const App = () => {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [radius, setRadius] = useState(2)
    const [currentGasStation, setCurrentGasStation] = useState();
    const [userInfo, setUserInfo] = useState()
    const [userId, setUserId] = useState(null)
    const [mapShow, setMapShow] = useState(null)
    
    const onGasSelect = (gasStation) => {
        setCurrentGasStation(gasStation)
    }
    if(!userId){
        return (
            <div className='pageLayout'>
                <Logo />
                <LoginReq setUserId={setUserId} setUserInfo={setUserInfo} />
                <div type='hidden'></div>
            </div>
        )
    }
    return (
        <div>
            <Route path='/gasStation'>
                <div className='gasPump'>
                    <Logo userId={userId} setUserId={setUserId}/>
                    <Geolocation lat={lat} setLat={setLat} setLong={setLong} />
                    <div className='dropDown'>
                        <Dropdown setRadius={setRadius} />
                    </div>
                    <Gas lat={lat} long={long} radius={radius} onSelect={onGasSelect} setMapShow={setMapShow} />
                    <Map lat={lat} long={long} destination={currentGasStation?.geometry?.coordinates} mapShow={mapShow} setMapShow={setMapShow} />
                </div>
            </Route>
            <Route path='/trips'>
                <div className='tripRoad'>
                    <Logo userId={userId} setUserId={setUserId}/>
                    <Trip userId={userId} />
                </div>
            </Route>
            <Route path='/'>
                <div className='homeRoad'>
                    <Logo  userId={userId} setUserId={setUserId}/>
                    <About />
                </div>
            </Route>
        </div>
    )
    
}

export default App
