import React from 'react'

const About = () => {
    return (
        <div>
             <div className='use'>
                <h1>How to use MileDIY</h1>
                <h3>To track your trip</h3>
                <li>Navigate to the trips tab using the menu</li>
                <li>Start a new trip</li>
                <li>Give your trip a name and let us know what your driving</li>
                <li>Whenever you put gas in your vehilce let us know how much, how far youve gone since you last put gas in and how much it was per gallon</li>
                <li>When youve reached your destination let us know by clicking finish trip!</li>
                <h3>To find a gas station near you</h3>
                <li>Navigate to the gas tab using the menu</li>
                <li>When you first are let in you must allow your location so we know where to look</li>
                <li>Let us know how far your willing to go to fill up</li>
                <li>Click the find gas button and choose your station</li>
                <li>A map will show up at the bottom and let you know how to get to your selected gas station</li>
            </div>
            <div className='about'>
                <h1>About MileDIY</h1>
                <p>MileDIY is an app for those who like to be able to track their gas mileage as well as how much you have spent on a trip. This app allows you to create your trip before leaving and track your progress along the way. A feature that will be avaliable soon the gas mileage for different vehilces by year, make and model. This data will becolected from MileDIY users and avaliable to the public! Stay tuned and watch for a description tag for when that API will be made avaliable. Unitl then enjoy tracking those miles!</p>
            </div>
        </div>
    )
}

export default About
