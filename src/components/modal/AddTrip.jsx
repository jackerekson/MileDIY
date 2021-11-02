import React, {useState} from 'react'
import axios from 'axios'
import './Modal.css'

const AddTrip = ({ tripId, showAddTrip, setShowAddTrip, userId, setDebouncedTrip }) => {
    const [gallons, setGallons] = useState(0)
    const [miles, setMiles] = useState(0)
    const [price, setPrice] = useState(0)
    
    if(!showAddTrip){
        return null
    }
    const addTrip = (e) => {
        e.preventDefault()
        setShowAddTrip(false)
        axios.post('http://localhost:3001/addstop', {tripId, gallons, miles, price, userId})
        setDebouncedTrip(2)
    }

    return (
        <div className='modal' onClick={e => setShowAddTrip(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Add Stop</h2>
                </div>
                <form onSubmit={e=>e.preventDefault()}>
                    <label htmlFor='gallons' className='inputLeft'>Gallons Added:</label><input id='gallons' onChange={e=>setGallons(e.target.value)}></input>
                    <br/>
                    <label htmlFor='miles' className='inputLeft'>Miles Driven:</label><input id='miles' onChange={e=>setMiles(e.target.value)}></input>
                    <br/>
                    <label htmlFor='price' className='inputLeft'>Price /Gallon:</label><input id='price' onChange={e=>setPrice(e.target.value)}></input>
                    <br/>
                </form>
                <div className='buttons'>
                    <button onClick={addTrip}>Add</button>
                    <button onClick={e=>setShowAddTrip(false)}>Cancle</button>
                </div>
            </div>
        </div>
    )
}

export default AddTrip
