import React from 'react'
import './view.scss'
function View(props) {
  return (
    <div className='view-container'>
        <h1 className='headline'>Admin profile</h1>
        <div className='table'>
            <div className='row'>
                <div className='cell left'>
                    <label>Admin ID</label>
                </div>
                <div className='cell'>
                    <label>#{props.id}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>First name </label>
                </div>
                <div className='cell'>
                    <label>{props.fname}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>Middle name </label>
                </div>
                <div className='cell'>
                    <label>{props.mname}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>Last name </label>
                </div>
                <div className='cell'>
                    <label>{props.lname}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>Age </label>
                </div>
                <div className='cell'>
                    <label>{props.age}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>Email </label>
                </div>
                <div className='cell'>
                    <label>{props.email}</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default View