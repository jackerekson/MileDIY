import React, { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'

const Geolocation = ({ setLat, setLong, lat }) => {
    const [errMsg, setErrMsg] = useState('')

   // asking user permission to access location
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((pos) => {
            setLat(pos.coords.latitude)
            setLong(pos.coords.longitude)
        }, (err) => setErrMsg(err.message))
        }, [setLat, setLong])

    const renderContent = () => {
        if(errMsg && !lat) {
            return <div>Error: {errMsg}</div>
        }

        if(!errMsg && lat) {
            return
        }

        return <Spinner message='Please accept location request' />
    }
    return (
        <div className='distanceDiv'>
            {renderContent()}
        </div>
    )
}

export default Geolocation
