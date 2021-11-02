import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AddTrip from '../modal/AddTrip';
import Vehicle from '../modal/Vehicle'
import './Trip.css'

const Trip = ({ setUserId, userId }) => {
    const [show, setShow] = useState(false)
    const [tripData, setTripData] = useState([])
    const [tripId, setTripId] = useState(null)
    const [showAddTrip, setShowAddTrip] = useState(false)
    const [debouncedTrip, setDebouncedTrip] = useState()
    const [tripLegData, setTripLegData] = useState(null)
    let showTrips

    
    if(tripLegData){
        showTrips = tripData.map((e)=> {
        let key = e.trip_id
        let tripInfo = []
        for(let i =0; i<tripLegData.length;i++){
            if(tripLegData[i].trip_id === key){
                tripInfo.push(tripLegData[i])
            }
        }
        let tripMiles = 0
        let averageMPG = 0
        let price = 0

        if(tripInfo.length !== 0){
            let trip=tripInfo[0]
            tripMiles = trip.miles.toFixed(2)
            averageMPG = (trip.miles/trip.gallons).toFixed(2)
            price = trip.price.toFixed(2)
        }

        const noMoreAdds = () => {
            const add = document.querySelector('#add')
            add.parentNode.removeChild(add)
        }


        return(
            <ul key={e.trip_id} className='tripCard'>
                <li><h2>{(e.trip_name).toUpperCase()}</h2></li>
                <span className='line'>
                    <p>Miles Driven: </p>
                    <li>{tripMiles}</li>
                </span>
                <span className='line'>
                    <p>Average MPG: </p>
                    <li>{averageMPG}</li>
                </span>
                <span className='line'>
                    <p>Total Spent: </p>
                    <li>{price}</li>
                </span>
                <div>
                    <button id='add' onClick={e=>{
                        setTripId(key)
                        setShowAddTrip(true)    
                    }}>Add stop</button>
                    <button onClick={noMoreAdds}>Finish Trip</button>
                </div>
            </ul>
        )
    })
}
    
    const trips = async() => {
        const res = await axios.post('http://localhost:3001/trips', {userId})
        setTripData(res.data.rows)
        // setDebouncedTrip(1)
    }
    const tripInfo = async() => {
        const res = await axios.post('http://localhost:3001/tripinfo', {userId})
        setTripLegData(res.data.rows)
        // setDebouncedTrip(1)
    }
    
    useEffect(() => {
        trips()
        tripInfo()
    }, [debouncedTrip])
   
    return (
        <div className='container'>
            <Vehicle show={show} setShow={setShow} userId={userId} tripData={tripData} setDebouncedTrip={setDebouncedTrip} />
            <AddTrip userId={userId} showAddTrip={showAddTrip} setShowAddTrip={setShowAddTrip} tripId={tripId} setDebouncedTrip={setDebouncedTrip} />
            <div className='buttons'>
                <button onClick={e => setShow(true)}>New Trip</button>
                <button onClick={e=>setUserId(null)}>Logout</button>
            </div>
            <div className='cardContainer container'>
                {showTrips}
            </div>
        </div>
    )
}

export default Trip
