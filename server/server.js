const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const cors = require('cors')
const pool = require('./db')

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
        return await axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson?latitude=${lat}&longitude=${long}&radius=${radius}&api_key=${gasKey}&limit=20&fuel_type=E85`)
    } catch (err) {
        throw new Error(err)
    }
}

const getUserInfo = async( email ) => {
    try{
        return await pool.query(`SELECT * FROM users WHERE user_email=$1`, [email])
    } catch (err) {
        console.log(err)
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

app.post('/signup', (req,res) => {
    const {firstName, lastName, email, password} = req.body
    pool.query(`INSERT INTO users (user_name, user_password, user_email) VALUES($1, $2, $3)`, [firstName + lastName, password, email])
    res.status(200).send('added to users')
})

app.post('/login', (req,res) => {
    try{
        const { email } = req.body
        const data = getUserInfo(email)
        data.then(function(result) {res.status(200).send(result)})
    } catch (err){
        res.status(400).send(err)
    }
})

app.post('/addvehicle', (req,res) => {
    const { make, model, year} = req.body
    pool.query(`INSERT INTO vehicles (vehicle_make, vehicle_model, vehicle_year) VALUES($1,$2,$3)`, [make,model,year])
    res.status(200).send('added to vehicles')
})

app.post('/addtrip', (req,res) => {
    const {userId, tripName} = req.body
    pool.query('INSERT INTO trip (user_id, trip_name) VALUES($1,$2)', [userId, tripName])
    res.status(200).send('added to trip')
})

app.post('/trips', (req,res) => {
    try{
        const {userId} = req.body
        const data = pool.query('SELECT * FROM trip WHERE user_id=$1', [userId])
        console.log(data)
        data.then(function(result) {res.status(200).send(result)})
    } catch(err){
        res.status(400).send(err)
    }
})

app.post('/addstop', (req,res) =>{
    const {miles, gallons, price, tripId, userId} = req.body
    pool.query('INSERT INTO trip_leg (gallons_added, miles_driven, price_per_gallon, trip_id, user_id) VALUES ($1,$2,$3,$4,$5)', [gallons, miles, price, tripId, userId])
    res.status(200).send('added to trip_leg')
})

app.post('/tripinfo', (req,res) => {
    try{
        const {userId} = req.body
        const data = pool.query('SELECT trip_id, SUM(miles_driven) AS miles, SUM(gallons_added) AS gallons, AVG(price_per_gallon) AS price FROM trip_leg WHERE user_id=$1 GROUP BY trip_id', [userId])
        data.then(function(result) {res.status(200).send(result)})
    } catch (err){
        res.status(400).send(err)
    }
})

app.post('/delete', (req,res) => {
    try{
        const {userId, index} = req.body
        pool.query('DELETE FROM trip WHERE trip_id=$1 AND user_id=$2', [index, userId])
    } catch(err){
        res.status(400).send(err)
    }
})

app.listen(3001, () => console.log('running on 3001'))

