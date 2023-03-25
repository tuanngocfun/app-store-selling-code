import './productlist.scss';
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Items from '../../data/products.json'



function ProductList(props){
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('/api')
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data)
                })
            } catch(err){
                console.log("Fail")
            }
        }
        
        getData();
    },[])

    // products.map((product) => {
    //     console.log(product)
    // })
    // console.log(products)

    return(
        <div className='product-container'> 

            {
                products && products.map((product, index) => {
                    if(index > 9){
                        return;
                    }

                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} price = {product.price} thumb = {product.filecover1}></Product>
                    )
                })
            }
        </div>

    );
}

export default ProductList;