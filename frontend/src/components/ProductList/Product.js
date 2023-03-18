import './product.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Product(props){

    return(
        <div className='item-container'>
            <Link className='product-link'>
                <img src={props.thumb} alt=''></img>
            </Link>
            <div className='item-description'>
                <h1 className='item-name'>{props.title}</h1>
                <h1 className='item-price'>{`$` + props.price}</h1>
            </div>
        </div>
)

}

export default Product;