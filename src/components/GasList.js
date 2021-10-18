import React from 'react'

const GasList = ({ info }) => {
    const renderInfo = info.map((e,i) => {
        return (
            <div key={i}>
                <h3>{e.properties.station_name}</h3>
                <div>{e.properties.street_address}, {e.properties.city} {e.properties.state}</div>
                <div>{e.properties.distance}/M</div>
                <br/> <br/>
            </div>
        )
    })
    return <div>{renderInfo}</div>
}

export default GasList
