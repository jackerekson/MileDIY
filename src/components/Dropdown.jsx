import React from 'react'

const Dropdown = ({ setRadius }) => {

    return (
        <div>
            <form id='dropDown'>
                <select id='distance' onChange={(e)=>setRadius(e.target.value)}>
                    <option value='2'>2</option>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>  
                </select>            
            </form>
        </div>
    )
}

export default Dropdown
