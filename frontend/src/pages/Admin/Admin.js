import React, { useEffect, useState } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import './admin.scss'
import Separator from '../../components/Separator/Separator';
import Dashboard from '../../components/DashNav/Routes/Dashboard/Dashboard';
import DashNav from '../../components/DashNav/DashNav';
function Admin() {

  const handleClick = async () =>{
    window.localStorage.clear()
    window.location = '/admin'
  }

  useEffect(() => {
    const url = window.location.href
    const getAdmin = async () => {
      try{
        const token = window.localStorage.getItem("accessToken")
        const response = await fetch(url, {
          method: 'POST',
          headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token}
        })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data)
        })
      }
      catch (error){
        console.log(error)
      }
    }
    
    getAdmin()
  }, [])

  const [admin, setAdmin] = useState([])
 

  return (
    <div className='admin-container'>
    {/* <Separator status ='2'></Separator> */}
    <Separator></Separator>
      <div className='admin-profile-container'>
        <div className='admin-avatar'>
            <RiAccountCircleFill className='icon'></RiAccountCircleFill>
        </div>
        <h1>Welcome Back, <span>{admin.firstname} {admin.lastname}</span>!</h1>
        <DashNav></DashNav>
        
        {/* <div className='admin-profile-info-container'>
          <label className='title'>Admin ID: </label>
          <label className='info'>{admin.adid}</label>
        </div>
        <div className='admin-profile-info-container'>
          <label className='title'>Name: </label>
          <label className='info'> {admin.lastname} {admin.middlename} {admin.firstname}  </label>
        </div>
        <div className='admin-profile-info-container'>
          <label className='title'>Email: </label>
          <label className='info'>{admin.email}</label>
        </div>
        <div className='admin-profile-info-container'>
          <label className='title'>Age: </label>
          <label className='info'>{admin.age}</label>
        </div>
        <div className='admin-profile-info-container'>
          <label className='title'>Role: </label>
          <label className='info'>{admin.role_name}</label>
        </div> */}
      </div>
      <button onClick={handleClick}>Sign Out</button>
      <Separator></Separator>
    </div>
  )
}

export default Admin