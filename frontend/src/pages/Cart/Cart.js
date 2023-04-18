import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cart.scss';
import Separator from '../../components/Separator/Separator';
import Headings from '../../components/ProductList/ProductPages/Headings/Headings';
import { BsCartFill } from 'react-icons/bs';
import { BsArrowLeftCircle } from 'react-icons/bs';
import CartItem from './CartItem/CartItem';
import { CartContext } from '../../Context/CartContext';
import GreenButton from '../../components/Button/GreenButton/GreenButton';

function Cart(props) {
  const [inventory, setInventory] = useState([]);
  const { quantity, total, setPayment } = useContext(CartContext);

  // useEffect(() => {
  //     const token = localStorage.getItem('accessUserToken')
  //     const getWish = async () => {
  //         try {
  //             const response = await fetch('/get/wishlist', {
  //                 method: 'POST',
  //                 headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},

  //             })
  //             .then((res) => res.json())
  //             .then((data) => console.log(data))
  //         } catch (error) {
  //             console.log("Failed to get wishlist")
  //         }
  //     }
  //     getWish()
  // }, [])

  //     useEffect(() => {
  //     const getRecommend = async () => {
  //         try {
  //             const response = await fetch('/api/recommended')
  //             .then((res) => res.json())
  //             .then((data) => console.log(data))
  //         } catch (error) {
  //             console.log("Failed to get recommend")
  //         }
  //     }
  //     getRecommend()
  // }, [])

  const inventInfo = async () => {
    const token = localStorage.getItem('accessUserToken');
    try {
      const response = await fetch('/cart/inventory/info', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(data => {
          setInventory(data);
          setPayment(data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    inventInfo();
  }, []);

  const handleMakePayment = () => {
    inventInfo();
  };

  return (
    <div className="cart-container">
      <div className="cart-inner-container">
        <Separator></Separator>
        <Separator status="3"></Separator>
        <div className="step-container">
          <div className="step one">
            <span className="number">1</span>
            <span className="text">Shopping cart</span>
            <span className="spacer"></span>
          </div>
          <div className="step two">
            <span className="number">2</span>
            <span className="text">Payment</span>
            <span className="spacer"></span>
          </div>
          <div className="step three">
            <span className="number">3</span>
            <span className="text">Game activation</span>
          </div>
        </div>
        <Separator></Separator>
        <div className="content-container">
          <div className="left-container">
            <div className="left-container-level">
              <Headings text="Cart"></Headings>
              <div className="cart-item-container">
                {inventory.length === 0 || quantity === 0 ? (
                  <div className="empty-container">
                    <BsCartFill className="icon"></BsCartFill>
                    <h1>Your cart is empty</h1>
                    <p>
                      You didn't add any item in your cart yet. Browse the
                      website to find amazing deals!
                    </p>
                    <Link to="/" className="button">
                      Browse games
                    </Link>
                  </div>
                ) : (
                  <div className="inventory-container">
                    {inventory.map((product, index) => {
                      return (
                        <CartItem
                          key={product.inventid}
                          proid={product.productid}
                          id={product.inventid}
                          title={product.title}
                          thumb={product.filecover1}
                          price={product.price}
                        ></CartItem>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <Separator></Separator>
            <div className="left-container-level">
              <Headings text="Recommended"></Headings>
              <div className="wishlist-item"></div>
            </div>
          </div>
          <div className="right-container">
            <Headings text="Summary"></Headings>
            <div className="summary-container">
              <div className="price-info-container">
                <div className="price-level">
                  <label className="text">Official price</label>
                  <label className="price">${total}</label>
                </div>
                <div className="price-level">
                  <label className="text">Discount</label>
                  <label className="price">$0</label>
                </div>
                <div className="price-level official">
                  <label className="text">Subtotal</label>
                  <label className="price">${total}</label>
                </div>
              </div>
              {inventory?.length === 0 ? (
                <GreenButton
                  title="Go To Payment"
                  link="payment-none"
                ></GreenButton>
              ) : (
                <GreenButton
                  title="Go To Payment"
                  link="payment"
                  event={handleMakePayment}
                ></GreenButton>
              )}

              <div className="divider">
                <div className="spacer"></div>
                <label>or</label>
                <div className="spacer"></div>
              </div>
              <Link to="/" className="back">
                <BsArrowLeftCircle className="icon"></BsArrowLeftCircle>Continue
                shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Separator></Separator>
    </div>
  );
}

export default Cart;
