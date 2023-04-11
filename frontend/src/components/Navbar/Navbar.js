import './navbar.scss';

import logoWord from '../../images/logo/logo-word.png';
import { Link } from "react-router-dom";
import { useState, createContext, useEffect, useRef, useContext } from 'react';

import { MdAccountCircle } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { BsFillCartFill } from 'react-icons/bs';
import {FaGlobe} from 'react-icons/fa'
import {RiAdminFill} from 'react-icons/ri'
import Login from '../Login/Login';
import Cart from '../../pages/Cart/Cart';

import { CartContext } from '../../Context/CartContext';

function Navbar(){
    const {quantity, setIsClicked} = useContext(CartContext)
    const [navbar, setNavbar] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const [state, setState] = useState(undefined)
    const [signedIn, setSignedIn] = useState(undefined)


    // useEffect(() => {
    //     ref.current = localStorage.getItem('cartNumb')
    //     setQuantity(ref.current)
        
    // })
   

    const handleSignOut = () => {
        window.localStorage.removeItem("accessUserToken")
        window.localStorage.removeItem("userAuthenticated")

        setSignedIn(!signedIn)
        window.location = '/'
    }


    const changeBackground = () => {
        if(window.scrollY >= 100){
            setNavbar(true);
        }
        else{
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

 
    useEffect(() => {
        const status = window.localStorage.getItem('authenticated')
        if(status === 'true'){
            setState(true)
        }
        else{
            setState(false)
        }
    }, [state])

    useEffect(() => {
        const userStatus = window.localStorage.getItem('userAuthenticated')
        if(userStatus === 'true'){
            setSignedIn(true)
        }
        else{
            setSignedIn(false)
        }
    }, [signedIn])

    
    return (
        <div className='pseudo-nav-container'>
            {/* <Login clicked = {isClicked} updateState={updateState}></Login> */}
            <Link to = "/" className='logo-container-one'>
                    <img src={logoWord} alt='' id='logo'></img>
            </Link>
            <div className={isSelected ? 'shadow active' : 'shadow'} onClick={() => setIsSelected(!isSelected)}></div>
            <div className={navbar ? "nav-container active" : 'nav-container'}>
                {/* <div className='language-container'>
                    <FaGlobe className='icon globe'></FaGlobe>

                    <div className='dropdown-menu'>
                        <h3>ENGLISH</h3>
                        <h3>TIẾNG VIỆT</h3>
                    </div>
                </div> */}
                <div className='left-nav'>
                    <FaGlobe className='icon globe'></FaGlobe>
                    {
                        
                        state ?
                        <Link to = '/admin' className='admin active'><RiAdminFill className='adminIcon'></RiAdminFill></Link>:
                        <Link to = '/admin' className='admin'><RiAdminFill></RiAdminFill></Link>
                        
                    }
                    
                </div>
                
                <div className='right-nav'>
                    {/* <Link to = '/'> */}
                        <BiSearch className='icon'></BiSearch>
                    {/* </Link> */}

                    {
                        signedIn ? 
                        <Link to = '/cart'>
                            {quantity > 0 ? <div className='indicator'>
                                <label>{quantity}</label>
                            </div> : null}
                            <BsFillCartFill className={ isActive ? 'icon active' : 'icon' } onClick={() => setIsActive(!isActive)}></BsFillCartFill>
                        </Link>
                         :

                        <Link to = '/user/signin'>
                            <BsFillCartFill className='icon'></BsFillCartFill>
                        </Link>
                    }
                    

                    
                    {/* <Link to='/user/signin' onClick={() => setIsClicked(!isClicked)}> */}
                    
                    {
                        signedIn ? 
                        <div className='profile-container'>
                            <MdAccountCircle className={ isSelected ? 'icon active' : 'icon' } onClick={() => setIsSelected(!isSelected)}></MdAccountCircle>
                            <div className={isSelected ? 'profile-dropdown-container active' : 'profile-dropdown-container'}>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('dashboard')
                                    }}>Dashboard</Link>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('orders')
                                    }}>My orders</Link>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('wishlist')
                                    }}>Wishlist</Link>
                                <Link to = '/activate-code' className='dropdown-button' onClick={() => setIsSelected(!isSelected)}>Activate code</Link>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('settings')
                                    }}>Settings</Link>
                                <div className='space'></div>
                                <button onClick={handleSignOut} className='signout-button'>Sign out</button>
                            </div>
                            
                        </div>

                        :
                        <Link to= '/user/signin'>
                            <MdAccountCircle className='icon'></MdAccountCircle>
                        </Link> 
                    }
                    
                    
                </div>

                
            </div>
            
        </div>
    )
}

export default Navbar;