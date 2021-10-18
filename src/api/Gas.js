import React, { useState } from 'react';
import axios from 'axios';
import GasList from '../components/GasList';

const Gas = ({ lat, long, radius }) => {
    const [info, setInfo] = useState([])

    const handleClick = async () => {
        try{
            // reaching the end point for the nearest gas station api by accessing OUR (this is communist russia) api
            const res = await axios.post('http://localhost:3001/nearestGasStation', {
                lat, 
                long, 
                radius
            })
                console.log(res.data)
                setInfo(res.data)
            } catch (err) {
                console.log(err)
            }
    }


    return (
        <div>
            <button onClick={handleClick}>Click me!</button>
            <GasList info={info} />
        </div>
    )
}

export default Gas
