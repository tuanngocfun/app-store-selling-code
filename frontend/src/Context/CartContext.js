import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({})

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [isClicked, setIsClicked] = useState("dashboard")
    const [deleted, setDeleted] = useState(false)
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [wishDetails, setWishDetails] = useState([])
    const [library, setLibrary] = useState([])
    const [payment, setPayment] = useState([])
    const token = localStorage.getItem("accessUserToken")

    useEffect(() => {
        const cartInfo = async () => {
            try {
                const response = await fetch("/cart/info",{
                method: 'POST',
                headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token}
                })
                .then((res) => res.json())
                .then((data) => {
                    setCart(data)
                    // setTotal(parseFloat(parseFloat(data.totalcart).toFixed(2)))
                    setTotal(parseFloat(data.totalcart))
                })
            } catch (error) {
                
            }
        }
        cartInfo()
    }, [])
    
    useEffect(() => {
        if(cart?.quantity > 0){
            setQuantity(cart.quantity)
        }
    }, [cart])

    return <CartContext.Provider 
                value = {
                    {
                        cart, setCart, quantity, setQuantity, 
                        total, setTotal, deleted, setDeleted,
                        wishDetails, setWishDetails,
                        isClicked, setIsClicked,
                        payment, setPayment,
                        library, setLibrary
                    }
                }
            >
        {children}
    </CartContext.Provider>
}