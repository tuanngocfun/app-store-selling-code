import React from 'react';
import { useState, useEffect } from 'react';
import './edit.scss';
import EditItem from './Edit-Item/EditItem';
import EditForm from './Edit-Form-Page/EditForm';

function Edit() {
  const [productDetails, setProductDetails] = useState([]);
  const [search, setSearch] = useState([]);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch('/api')
          .then(res => res.json())
          .then(data => {
            setProductDetails(data);
          });
      } catch (error) {
        console.log('Failed to fetch');
      }
    };
    getDetails();
  }, []);

  return (
    <div className="edit-container">
      <input
        type="search"
        className="search-input"
        onChange={e => setSearch(e.target.value)}
        placeholder="Search for a Product.."
      ></input>
      <div className="edit-product-container">
        {productDetails &&
          productDetails
            .filter(product => product.title.toLowerCase().includes(search))
            .map((product, index) => {
              return (
                <EditItem
                  key={product.productid}
                  thumb={product.filecover1}
                  title={product.title}
                  id={product.productid}
                  price={product.price}
                ></EditItem>
              );
            })}
      </div>
    </div>
  );
}

export default Edit;
