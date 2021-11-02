import React, { useState } from 'react'
import axios from 'axios'
import './Modal.css'

const SignupModal = ({ show, setShow }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if(!show){
        return null
    }

    const handleCreateAccout = (e) => {
        e.preventDefault() 
        axios.post('http://localhost:3001/signup', {firstName, lastName, email, password})
        setShow(false)
    }

    return (
        <div className='modal' onClick={e => setShow(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Sign Up</h2>
                </div>
                <form>
                    <label htmlFor='firstName' className='inputLeft'>First Name:</label><input id='firstName' onChange={e=>setFirstName(e.target.value)}></input>
                    <br/>
                    <label htmlFor='lastName' className='inputLeft'>Last Name:</label><input id='lastName' onChange={e=>setLastName(e.target.value)}></input>
                    <br/>
                    <label htmlFor='email' className='inputLeft'>Email:</label><input id='email' onChange={e=>setEmail(e.target.value)}></input>
                    <br/>
                    <label htmlFor='password' className='inputLeft'>Password:</label><input id='password' type='password' onChange={e=>setPassword(e.target.value)}></input>
                    <br/>
                    <label htmlFor='confirmPassword' className='inputLeft'>Confirm Password:</label><input id='confirmPassword' type='password' onChange={e=>setConfirmPassword(e.target.value)}></input>
                    <br/>
                </form>
                <div className='buttons'>
                    <button onClick={handleCreateAccout}>Create Account</button> 
                    <button onClick={e => setShow(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SignupModal
