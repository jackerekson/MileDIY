const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const cors = require('cors')
dotenv.config({path: './config.env'})
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000/'
}))

const gasKey = process.env.REACT_APP_GAS_API_KEY


//creating a async await function to be called inside my api request
const getGas = async(lat, long, radius) => {
    try{
        return await axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson?latitude=${lat}&longitude=${long}&radius=${radius}&api_key=${gasKey}&limit=20`)
    } catch (err) {
        throw new Error(err)
    }
    
}
// providing the response from the nearest gas station api to the front end after it is requested from /nearestGasStation
app.post('/nearestGasStation', (req,res) => {
    try {
        const { lat, long, radius } = req.body
        const data = getGas( lat, long, radius )
        data.then(function(result) {res.status(200).send(result.data.features)})
        
    } catch (err){
        res.status(400).send(err)
    }
})


app.listen(3001, () => console.log('running on 3001'))

