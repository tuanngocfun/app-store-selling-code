import './productlist.scss';
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Items from '../../data/products.json'



function ProductList(){
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

    return(
        <div className='product-container'> 

            {
                products && products.map(product => {
                    return(
                        <Product key={ product.id } title={product.title} price = {product.price} thumb = {product.thumb}></Product>
                    )
                })
            }
        </div>
    );
}

export default ProductList;