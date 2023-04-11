import './adminSettings.scss'
import React, { useState } from 'react'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'

import View from './ViewProfile/View'
function AdminSettings(props) {
    const [isActive, setActive] = useState('info')

  return (
    <div className='settings-container'>
        <div className='left-nav-container'>
            {isActive === 'info'
            ? <div className='section info' onClick={() => {setActive("info")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>View your profile</h5> 
                   <span className='text'>Name, age, email, and other information.</span> 
                </div>   
            </div>
            : <div className='section' onClick={() => {setActive("info")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>View your profile</h5> 
                   <span className='text'>Name, age, email, and other information.</span> 
                </div>   
            </div>
            }
        
            {isActive === 'profile'
            ? <div className='section profile' onClick={() => {setActive("profile")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>Customize your profile</h5> 
                   <span className='text'>Make changes in your profile information.</span> 
                </div>   
            </div>
            : <div className='section' onClick={() => {setActive("profile")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>Customize your profile</h5> 
                   <span className='text'>Make changes in your profile information.</span> 
                </div>   
            </div>
            }

            {isActive === 'privacy'
            ? <div className='section privacy' onClick={() => {setActive("privacy")}}>
                <RiLockPasswordLine className='icon'></RiLockPasswordLine>
                    <div className='content'>
                    <h5 className='header'>Email and password</h5> 
                    <span className='text'>Change your email or password.</span> 
                </div>
            </div>
            : <div className='section' onClick={() => {setActive("privacy")}}>
                <RiLockPasswordLine className='icon'></RiLockPasswordLine>
                    <div className='content'>
                    <h5 className='header'>Email and password</h5> 
                    <span className='text'>Change your email or password.</span> 
                </div>
            </div>
            }
            
            
        </div>

        <div className='right-container'>
            <div className='vertical-space'></div>
            {isActive === 'info' && <View id = {props.id} fname = {props.fname} mname = {props.mname} 
            lname = {props.lname} age = {props.age} email = {props.email}></View>} 
        </div>
    </div>
  )
}

export default AdminSettings