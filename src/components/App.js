import React, { useEffect, useState } from 'react'
import Gas from '../api/Gas'
import Spinner from './Spinner'

const App = () => {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [radius, setRadius] = useState(5)
    const [errMsg, setErrMsg] = useState('')

   // asking user permission to access location
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((pos) => {
            setLat(pos.coords.latitude)
            setLong(pos.coords.longitude)
        }, (err) => setErrMsg(err.message))
        }, [])

    const renderContent = () => {
        if(errMsg && !lat) {
            return <div>Error: {errMsg}</div>
        }

        if(!errMsg && lat) {
            return `Distance`
        }

        return <Spinner message='Please accept location request' />
    }

    return (
        <div>
            {renderContent()}
            <form id='dropDown'>
                <select id='distance' onChange={(e)=>setRadius(e.target.value)}>
                    <option value='2'>2</option>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>  
                </select>            
            </form>
            <Gas lat={lat} long={long} radius={radius} />
        </div>
    )
    
}

export default App
