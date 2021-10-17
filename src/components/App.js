import React from 'react'
import axios from 'axios';

const App = () => {
    const handleClick = async () => {
        try{
        
            // reaching the end point for the nearest gas station api by accessing my api
            const res = await axios.post('http://localhost:3001/nearestGasStation', { 
                lat: 44.456927, 
                long: -87.941208, 
                radius: 2
            })
                console.log(res)
            } catch (err) {
                console.log(err)
            }
    }

    return (
        <div>
            <button onClick={handleClick}>Push me</button>
        </div>
    )
}

export default App
