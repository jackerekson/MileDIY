const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const cors = require('cors')
dotenv.config({path: './config.env'})
const app = express()
app.use(cors({
    origin: 'http://localhost:3000/'
}))

const gasKey = process.env.REACT_APP_GAS_API_KEY

// providing the response from the nearest gas station api to the front end after it is requested from /nearestGasStation

app.post('/nearestGasStation', async (req,res) => {
    try {
        console.log(req.body)
        // const { lat, long, radius } = req.body
        const gasRes = await axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson?latitude=44.456927&longitude=-87.941208&radius=2&api_key=${gasKey}&limit=20`)
        res.status(200).send(gasRes)
    } catch (err){
        res.status(400).send(err)
    }
})


app.listen(3001, () => console.log('running on 3001'))

