import React, { useState } from 'react'
import Gas from '../api/Gas'
import Dropdown from './Dropdown'
import Geolocation from '../api/Geolocation'
import Trip from './trip/Trip'
import Map from '../api/Map'
import LoginReq from '../api/login/LoginReq'
import Header from './header/Header'
import Route from './Route'
import Logo from './logo/Logo'

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
                <div className='logo'>footer</div>
            </div>
        )
    }
    return (
        <div>
            <Route path='/gasStation'>
                <Logo />
                <Header />
                <Geolocation lat={lat} setLat={setLat} setLong={setLong} />
                <Dropdown setRadius={setRadius} />
                <Gas lat={lat} long={long} radius={radius} onSelect={onGasSelect} setMapShow={setMapShow} setUserId={setUserId} />
                <Map lat={lat} long={long} destination={currentGasStation?.geometry?.coordinates} mapShow={mapShow} setMapShow={setMapShow} />
            </Route>
            <Route path='/trips'>
                <Logo />
                <Header />
                <Trip setUserId={setUserId} userId={userId} />
            </Route>
            <Route path='/'>
                <Logo />
                <Header />
                <button onClick={e=>setUserId(null)}>Logout</button>

            </Route>
        </div>
    )
    
}

export default App
