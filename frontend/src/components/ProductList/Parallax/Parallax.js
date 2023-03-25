import React from 'react'
import './parallax.scss'

function Parallax(prop) {
  return (
    <div className='parallax-container'>
        <div className='parallax-inner-container'>
            <div className='top-banner-gradient'></div>
            <img src={prop.banner}></img>
            <div className='bottom-banner-gradient'></div>
        </div>
       
    </div>
  )
}

export default Parallax
