import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SignupModal from '../../components/modal/SignupModal'
import './Login.css'

const LoginReq = ({ setUserInfo, setUserId }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [userData, setUserData] = useState()
    const [show, setShow] = useState(false)
    
    const updateEmail = async(e) =>{
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setTimeout(()=>{
            setPassword(e.target.value)
        }, 500)
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const handleClick = async(e) => {
        e.preventDefault()
        const addOne = document.querySelector('.login')
        const textnode = document.createTextNode('Incorrect Username or Password')
        await axios.post('http://localhost:3001/login', {email})
        .then(res => setUserData(res.data.rows[0]))
        
        const checkPassword = (userData) => {
            if(addOne.hasChildNodes()){
                addOne.removeChild(addOne.childNodes[0])
            }
            if(!userData){
                return(
                    addOne.appendChild(textnode)
                )
            }else if(userData.user_password === password){
                setUserInfo(userData)
                setUserId(userData.user_id)
            } else if(userData.user_password !== password){
                return (
                    addOne.appendChild(textnode)
                )
            }
        }
        checkPassword(userData)
    }

    return (
        <div className='container'>
            <div className='inside'>
                <form type='submit'>
                    <p className='inputLeft'>Email</p><input className='loginInputTop' onChange={updateEmail}></input>
                    <br/>
                    <p className='inputLeft'>Password</p><input type='password' className='loginInputBottom' onChange={updatePassword}></input>
                    <br/>
                    <input type='hidden' value="Incorrect Username or Password"></input>
                    <div className='login'></div>
                    <div className='buttons'>
                        <button type='submit' onClick={handleClick}>Login</button>
                        <button onClick={handleSignUp}>Sign up</button>
                    </div>
                </form>
            </div>
                    <SignupModal show={show} setShow={setShow} />
        </div>
    )
}

export default LoginReq
