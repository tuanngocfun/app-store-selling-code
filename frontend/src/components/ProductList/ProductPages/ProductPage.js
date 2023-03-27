import './productpage.scss'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'

import noIMG from '../../../images/no-image-black.png'

//Icons
import {RiSteamFill} from 'react-icons/ri'
import {BsCheckCircle} from 'react-icons/bs'
import { BsFillCartFill } from 'react-icons/bs';
import{AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {BiBarcode} from 'react-icons/bi'

//Components
import Separator from '../../Separator/Separator'
import GreenButton from '../../Button/GreenButton/GreenButton'
import Parallax from '../Parallax/Parallax'
import Headings from './Headings/Headings'
import Login from '../../Login/Login'

function ProductPage() {
    const params = useParams()
    const filteredID = params.id.substring(0, params.id.indexOf('-'))

    const [productDetails, setProductDetails] = useState([])
    const [wishlist, setWishList] = useState(false)
    


    
    useEffect(() => {
        const url = '/api/' + filteredID
        // console.log(url)
        const getDetails = async () => {
            try {
                const response = await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setProductDetails(data)
                })
            } catch (error) {
                console.log("Fail")
            }
        }

        getDetails()
    }, [])

    const navigate = useNavigate()
    const handleClick = () => {
        const authUser = window.localStorage.getItem("userAuthenticated")
        // console.log(authUser)
        if(!authUser){
            // window.location = ('/    user/signin')
            navigate('/user/signin')
            // console.log("hello")
        }
        else{
            setWishList(!wishlist)
        }
        
    }

    // console.log(productDetails)
    
    // setID(filteredID)
    // console.log(id)

    // console.log(productDetails.filebanner)

    return (
        <div className='product-outer-container'>
            <Parallax banner = {productDetails.filebanner}></Parallax>
            <div className='product-main-container'>
                <div className='top-data-container'>
                    <div className='cover-container'>
                        {
                            productDetails.filecover1 === undefined ? <img src={noIMG}></img> :
                            <img src = {productDetails.filecover1} alt={productDetails.title}></img> 
                        }
                        
                    </div>
                    <div className='main-data-container'>
                        {
                            wishlist ? <AiFillHeart className='wishlist active' onClick={() => handleClick()}></AiFillHeart>
                            : <AiOutlineHeart className='wishlist' onClick={() => handleClick()}></AiOutlineHeart>
                        }
                        
                        <h1 className='title'>{productDetails.title}</h1>

                        <div className='sub-info'>
                            <div className='steam-container'>
                                <RiSteamFill className='icon'></RiSteamFill>
                                <label>Steam</label>
                                <div className='vertical'></div>
                                <BsCheckCircle className='check-icon'></BsCheckCircle>
                                <label>In stock</label>
                                <div className='vertical'></div>
                                <BsCheckCircle className='check-icon'></BsCheckCircle>
                                <label>Digital download</label>    
                            </div>
                        </div>
                        <label className='wishlist-tracker'><AiFillHeart className='icon'></AiFillHeart># users have wishlisted this game.</label>

                        <label className='price'>{`$${productDetails.price}`}</label>
                        <div className='payment-container'>
                            <Link to = '/' className='cart-button'><BsFillCartFill className='cart-icon'></BsFillCartFill></Link>
                            <Link to = '/' className='buy-button'>Buy now</Link>
                        </div>
                    </div>
                </div>
                <Separator></Separator>
                <Headings text = 'About the game'></Headings>
                <Separator status= '3'></Separator>
                <div className='about-container'>
                    <div className='about-left-container'>
                        {parse(`${productDetails.descriptions}`)}
                        <div className='read-more'>Read more</div>
                    </div>

                    <div className='about-right-container'>
                        <div className='row one'>
                            <div className='cell-left'>Installation:</div>
                            <div className='cell-right'>How to activate your game code</div>
                        </div>
                        <div className='row two'>
                            <div className='cell-left'>Developer:</div>
                            <div className='cell-right'>{productDetails.developer}</div>
                        </div>
                        <div className='row three'>
                            <div className='cell-left'>Publisher:</div>
                            <div className='cell-right'>{productDetails.publisher}</div>
                        </div>
                        <div className='row four'>
                            <div className='cell-left'>Release date:</div>
                            <div className='cell-right'>{productDetails.date}</div>
                        </div>
                        <div className='row five'>
                            <div className='cell-left'>Genre:</div>
                            <div className='cell-right'>{productDetails.genre}</div>
                        </div>
                    </div>
                    
                </div>

                <Separator></Separator>
                <Headings text = 'Visuals'></Headings>
                <Separator status= '3'></Separator>

                <div className='visual-container'>
                    <div className='video-container'>
                        <img src={productDetails.filebanner} alt={productDetails.title}></img>
                    </div>
                    <div className='showcase-container'>
                        <div className='showcase-left'>
                            <img src={productDetails.filecover2} alt={productDetails.title}></img>
                        </div>
                        <div className='showcase-right'>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg1} alt={productDetails.title}></img>
                            </div>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg2} alt={productDetails.title}></img>
                            </div>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg3} alt={productDetails.title}></img>
                            </div>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg4} alt={productDetails.title}></img>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator></Separator>
                <Headings text = 'Descriptions'></Headings>
                <Separator status= '3'></Separator>
                <div className='descriptions-container'>
                    {parse(`${productDetails.descriptions}`)}
                </div>

                
            </div>
            <div className='activation-container'>
                <div className='activation-inner-container'>
                    <div className='activation-left'>
                        <BiBarcode className='barcode'></BiBarcode>
                        <div className='text-container'>
                            <label className='heads-up'>Do not know how to activate your game?</label>
                            <label className='sub-heads-up'>Click the button to read the instructions !</label>
                        </div>
                    </div>
                    <div className='activation-right'>
                        <div className='activate-button'>Learn how!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage