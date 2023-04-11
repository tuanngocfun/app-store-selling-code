import './userNav.scss'
import React, {useState, useContext} from 'react'
import Separator from '../../../components/Separator/Separator'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {RxGear} from 'react-icons/rx'
import UserDash from '../UserDash/UserDash'
import Wishlist from '../Wishlist/Wishlist'
import { CartContext } from '../../../Context/CartContext'
function UserNav(props) {

    const {isClicked, setIsClicked} = useContext(CartContext)
  return (
    <div className='dashboard-container'>
        <div className='dashboard-header-container'>
            {isClicked === 'dashboard'
            ? <div className= 'link dashboard' onClick={() => {setIsClicked("dashboard")}}> <MdOutlineSpaceDashboard className='icon'></MdOutlineSpaceDashboard>Dashboard</div>
            : <div className= 'link' onClick={() => {setIsClicked("dashboard")}}><MdOutlineSpaceDashboard className='icon'></MdOutlineSpaceDashboard>Dashboard</div>
            }
            {isClicked === 'orders'
            ? <div className= 'link orders' onClick={() => {setIsClicked("orders")}}>My orders</div>
            : <div className= 'link' onClick={() => {setIsClicked("orders")}}>My orders</div>
            }

            {isClicked === 'wishlist'
            ? <div className= 'link wishlist' onClick={() => {setIsClicked("wishlist")}}>Wishlist</div>
            : <div className= 'link' onClick={() => {setIsClicked("wishlist")}}>Wishlist</div>
            }

            {isClicked === 'library'
            ? <div className= 'link library' onClick={() => {setIsClicked("library")}}>Library</div>
            : <div className= 'link' onClick={() => {setIsClicked("library")}}>Library</div>
            }
            
            {isClicked === 'wallet'
            ? <div className= 'link wallet' onClick={() => {setIsClicked("wallet")}}>Wallet</div>
            : <div className= 'link' onClick={() => {setIsClicked("wallet")}}>Wallet</div>
            }

            {isClicked === 'settings'
            ? <div className= 'link settings' id='settings' onClick={() => {setIsClicked("settings")}}><RxGear className='icon settings'></RxGear>Settings</div>
            : <div className= 'link' id='settings' onClick={() => {setIsClicked("settings")}}><RxGear className='icon settings'></RxGear>Settings</div>
            }
            
        </div>
        <Separator></Separator>
        {isClicked === 'dashboard' && <UserDash wish = {props.wish}></UserDash>}
        {isClicked === 'wishlist' && <Wishlist id = {props.id}></Wishlist>}
        <Separator status = '2'></Separator>
    </div>
  )
}

export default UserNav