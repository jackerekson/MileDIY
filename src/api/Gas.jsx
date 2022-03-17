import React, { useState } from 'react';
import axios from 'axios';
import GasList from '../components/GasList';

const Gas = ({ lat, long, radius, onSelect, setMapShow }) => {
    const [info, setInfo] = useState([])

    const handleClick = async () => {
        try{
            // reaching the end point for the nearest gas station api by accessing OUR (this is communist russia) api
            const res = await axios.post('http://localhost:3001/nearestGasStation', {
                lat, 
                long, 
                radius
            })
                setInfo(res.data)
            } catch (err) {
                console.log(err)
            }
    }


    return (
        <div className='buttons gas'>
            <div className='gasButtons'>
                <button onClick={handleClick}>Find Gas</button>
            </div>
            <div className='gasList'>
                <GasList setMapShow={setMapShow} info={info} radius={radius} onGasSelect={onSelect}/>
            </div>
        </div>
    )
}

export default Gas
