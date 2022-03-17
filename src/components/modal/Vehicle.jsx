import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VehiclesApi } from '../../api/vehiclesApi'
import './Modal.css'

const Vehicle = ({ show, setShow, userId, setDebouncedTrip }) => {
    const [vehicles, setVehicles] = useState([])
    const [models, setModels] = useState([])
    const [year, setYear] = useState(0)
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [tripName, setTripName] = useState('Trip')
    let years = []

    for(let i=2022;i>1965;i--){
        years.push(i)
    }

    //grabbing all the vehicle makes and rendering them in the dropdown
    const showName = vehicles.map(e => {
        return(
            <option key={e.MakeId}>{e.MakeName}</option>
        )
    })

    const showModel = models.map(e => {
        return(
            <option key={e.Model_ID}>{e.Model_Name}</option>
        )
    })

    const showYear = years.map(e => {
        return(
            <option key={e}>{e}</option>
            )
        })
        
    const handleChange = async(e) => {
        setMake(e.target.value.toLowerCase())            
    }

    const handleCreateTrip = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/addvehicle', { make, year, model })
        axios.post('http://localhost:3001/addtrip', {userId, tripName})
        setShow(false)
        setDebouncedTrip(3)
    }

    //making the api call for vehicle makes
    useEffect(() => {
        // if(!year){
        //     return;
        // }
        VehiclesApi.getAllVehicles()
            .then( (result) => setVehicles(result) )
            .then( res => {
                return VehiclesApi.getModels(make, year)
            })
            .then( (result) => setModels(result) )

    }, [make, year])

    if(!show){
        return(
            null
        )
    }

    return(
        <div className='modal' onClick={e => setShow(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
            <div className='modal-header'>
                    <h3>Create New Trip</h3>
                </div> 
                <div className='modal-body'>
                    <form>
                        <p>Trip Name:</p><input onChange={e=>setTripName(e.target.value)}></input>
                        <br/><br/>
                        <select onChange={e=>setYear(e.target.value)}>
                            <option>Vehicle Year</option>
                            {showYear}
                        </select>
                    </form>
                    <br/>
                    <form>
                        <select onChange={handleChange}>
                            <option>Vehicle Make</option>
                            {showName}
                        </select>
                    </form>
                    <br/>
                    <form>
                        <select onChange={e=>setModel(e.target.value)}>
                            <option>Vehicle Model</option>
                            {showModel}
                        </select>
                    </form>
                    <br/>
                    <br/>
                    <div className='buttons'>
                    <button onClick={handleCreateTrip}>Create Trip</button><button onClick={e=>setShow(false)}>Cancle</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicle
