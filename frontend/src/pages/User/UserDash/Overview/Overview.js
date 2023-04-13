import React, {useContext} from 'react'
import './overview.scss'
import {RiNumbersFill} from 'react-icons/ri'
import { CartContext } from '../../../../Context/CartContext'

function Overview(props) {
    const {libraryNumb} = useContext(CartContext)
  return (
    <div className='overview-container'>
        <RiNumbersFill className='icon'></RiNumbersFill>
        <label className='header'>Overview</label>
        <div className='stats-container'>
            <div className='space'></div>
            <div className='numbers-container'>
                <div className='sub-stat'>
                    <div className='number'>{libraryNumb}</div>
                    <div className='title'>Games</div>
                </div>
                <div className='sub-stat'>
                    <div className='number'>{props.wish}</div>
                    <div className='title'>Wishlist</div>
                </div>
                <div className='sub-stat'>
                    <div className='number'>0</div>
                    <div className='title'>Likes</div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Overview