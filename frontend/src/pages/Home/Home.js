import './home.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import LogoWord from '../../images/logo/logo-word.png';
import levi from '../../images/levi.png';
import keria from '../../images/keria.png'


import Headline from '../../components/Headline/Headline';
import ProductList from '../../components/ProductList/ProductList';
import Separator from '../../components/Separator/Separator';
import TrustPanel from '../../components/TrustPanel/TrustPanel';
import GreenButton from '../../components/Button/GreenButton/GreenButton';
import Categories from '../../components/Categories/Categories';

import {BsStarFill} from 'react-icons/bs'
import { BsFillEnvelopeFill} from 'react-icons/bs'

function Home(){
    
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('api')
                setProducts(res.data)
            } catch(err){
                console.log("Fail")
            }
        }
       
        getData();
    },[])
    var first = products[5]

    return(
        <div className="home-container">
            <div className="main-content">
                <div className='top-banner'>
                    <div className='parallax'>
                        <div className='top-banner-gradient'></div>
                            {(typeof first === 'undefined')? (
                                <div className='loading-container'></div>
                            ): (
                                <img src= {first.thumb} alt=''></img>
                            )}
                        <div className='bottom-banner-gradient'></div>
                    </div>
                    
                    <div className='content'>
                        <Link to = '/' className='banner-product'>
                        
                            <div className='banner-product-wrapper'>
                                <div className='newest-trending'>New</div>
                                {(typeof first === 'undefined') ? (
                                    <div></div>
                                ): (
                                    <div className='title'>{first.title}</div>
                                )}
                                
                                
                                {(typeof first === 'undefined')? (
                                    <div></div>
                                ): (
                                    <div className='price'>{`$`+first.price}</div>
                                )}
                            </div>                          
                        </Link>  
                    </div>    
                </div>   
                
                <div className='trend-container'>
                    <Headline title='Trending'></Headline>
                    <ProductList></ProductList>
                </div>

                <Separator status = '1'></Separator>
                <TrustPanel></TrustPanel>
                <Separator status = '0'></Separator>

                <div className='preorder-container'>
                    <Headline title='Pre-Orders'></Headline>
                    <ProductList></ProductList>
                </div>
                <Separator status = '2'></Separator>

                <div className='review-container'>
                    <div className='pseudo-container'></div>
                    <div className='review-content-container'>
                        <div className='review-actor'>
                            <img src={levi} alt=''></img>
                        </div>
                        <div className='review-content'>
                            <div className='rating'>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                            </div>
                            <p><span>RISEN GAMING</span> is a great way towards cheaper games, while still supporting the developers. It was quick, 
                                I was able to pay with Momo and got the code instantly after payment. <br></br><br></br>
                                Levi, GAM Esports Player and Risen Gaming partner.
                            </p>
                        </div>
                     </div>

                     {/* <div className='sub-review-container'>
                        <div className='sub-review-container-pseudo'>
                            <div className='sub-review-item'>
                                <div className='sub-review-actor'>
                                    <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                            <div className='sub-review-item'>
                            <div className='sub-review-actor'>
                                <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                            <div className='sub-review-item'>
                            <div className='sub-review-actor'>
                                <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                            <div className='sub-review-item'>
                                <div className='sub-review-actor'>
                                    <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                        </div>
                     </div> */}
                </div>
                <Separator></Separator>

                <div className='bestsellers-container'>
                    <Headline title='Best Sellers'></Headline>
                    <ProductList></ProductList>
                </div>
                <Separator></Separator>

                <div className='banner-container'>
                    <div className='banner-container-filter'></div>
                    <div className='banner-content-container'>
                        <div className='logo'>
                            <img src = {LogoWord} alt=''></img>
                        </div>
                        <h1>Follow us now on Social Media Platforms to hear from us first!</h1>
                        <h2>We are available on Facebook, Youtube, Discord, Instagram and more.</h2>
                        <GreenButton title='Follow Now'></GreenButton>
                        
                    </div>
                    
                </div>
                <Separator></Separator>

                <div className='categories-outer-container'>
                    <Headline title='Categories'></Headline>
                    <Categories></Categories>
                </div>
                <Separator></Separator>
                <Separator status ='2'></Separator>

                <div className='news-container'>
                    <BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill>
                    <h1>Don't miss any offers and promotion!</h1>
                    <h2>And be the first to receive our private offers, newsletters and deals of the week!</h2>
                    <GreenButton title='Sign Up'></GreenButton>
                </div>
            </div>
        </div>
    )
}

export default Home;