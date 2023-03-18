import React from 'react'
import { useState, useEffect } from 'react'
import './login.scss'
import logoVertical from '../../images/logo/vertical-green.png'
import { Link } from 'react-router-dom'
import {FaFacebookF} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {MdCancel} from 'react-icons/md'

function Login(prop) {
//   const [user, setUser] = useState([{
//         email: "",
//         password: "",
//   }])

//   const [isAuthenticated, setAuthenticated] = useState(false)

//   const handleChange = (e) =>{
//         const {name, value} = e.target
//         setUser({...user, [name] : value})
//     }

//   const onSubmitForm = async (e) =>{
//         e.preventDefault()

//         try {
//             const body = {
//                 email: user.email,
//                 password: user.password
//             }

//             
            
//         } catch (error) {
//             console.log(error.message)
//         }
//   }

  return (
    <div className= 'login-container'>
        <div className='top-container'>
            <Link to = '/'>
                <MdCancel className='cancel'></MdCancel>
            </Link>
            
        </div>
        <div className='login-container-inner'>
            <img src={logoVertical} alt=''></img>
            <span className='header'>Sign In</span>

            <div className='sso-container'>
                <Link to='/' className='social-method face'>
                    <FaFacebookF className='icon'></FaFacebookF>
                </Link>
                <Link to='/' className='social-method google'>
                    <FcGoogle className='icon'></FcGoogle>
                </Link>
            </div>

            <div className='login-separator'>
                <div className='space'></div>
                <span>or</span>
                <div className='space'></div>
            </div>

            <form className='form-container' >
                <input className='opacity' type='email' name='email' placeholder='Email' required ></input>
                <input className='opacity' type='password' name='password' placeholder='***********' ></input>
                <button className='submit-button' type='submit'> Submit </button>
            </form>

            <div className='forgot-container'>
                <Link to={{pathname: `/${prop.title}/signup`}} onClick={prop.updateState}>No account yet?</Link>
                <Link to=''>Lost password?</Link>
            </div>
            
        </div>

    </div>
  )
}

export default Login