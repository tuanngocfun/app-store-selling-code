import './navbar.scss';

import logoWord from '../../images/logo/logo-word.png';
import { Link } from "react-router-dom";
import { useState, createContext, useEffect } from 'react';

import { MdAccountCircle } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { BsFillCartFill } from 'react-icons/bs';
import {FaGlobe} from 'react-icons/fa'
import {RiAdminFill} from 'react-icons/ri'
import Login from '../Login/Login';


function Navbar(){
    const [navbar, setNavbar] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState(null)
    const [state, setState] = useState(undefined)
    const [signedIn, setSignedIn] = useState(undefined)

    const handleSignOut = () => {
        window.localStorage.clear()
        setSignedIn(!signedIn)
        window.location = '/'
    }


    // useEffect(() => {
    //     // status = window.localStorage.getItem("authenticated")
    // },[])

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
    })

    useEffect(() => {
        const userStatus = window.localStorage.getItem('userAuthenticated')
        if(userStatus === 'true'){
            setSignedIn(true)
        }
        else{
            setSignedIn(false)
        }
    })
    
    return (
        <div className='pseudo-nav-container'>
            {/* <Login clicked = {isClicked} updateState={updateState}></Login> */}
            <Link to = "/" className='logo-container-one'>
                    <img src={logoWord} alt='' id='logo'></img>
            </Link>
            <div className={isClicked ? 'shadow active' : 'shadow'} onClick={() => setIsClicked(!isClicked)}></div>
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
                    <Link to = '/'>
                        <BiSearch className='icon'></BiSearch>
                    </Link>
                    <Link to = '/'>
                        <BsFillCartFill className='icon'></BsFillCartFill>
                    </Link>

                    
                    {/* <Link to='/user/signin' onClick={() => setIsClicked(!isClicked)}> */}
                    
                    {
                        signedIn ? 
                        <div className='profile-container'>
                            <MdAccountCircle className={ isClicked ? 'icon active' : 'icon' } onClick={() => setIsClicked(!isClicked)}></MdAccountCircle>
                            <div className={isClicked ? 'profile-dropdown-container active' : 'profile-dropdown-container'}>
                                <Link to = '/user/dashboard' className='dropdown-button'>Dashboard</Link>
                                <Link to = '/user/dashboard' className='dropdown-button'>Activate code</Link>
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