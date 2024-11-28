import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (itemToAdd) => {
        const checkItemAlready = cartItems.find((cartItem) => {
            return cartItem._id === itemToAdd._id
        })

        if(!checkItemAlready) {
            itemToAdd.quantity = 1

            setCartItems([...cartItems, itemToAdd])
          //  console.log('Item adicionado corretamente')  
            alert('Prato adicionado ao carrinho com sucesso!') 
        } else {
           // console.log('O item já está no carrinho')   
            alert('O item já está no carrinho, caso deseje adicionar mais um parto  vá até o carrinho e altere a quantidade.') 
        }
    }

    const removeFromCart = (itemId) => {
        const cartItemsSanitized = cartItems.filter((item) => {
            return item._id !== itemId
        })
        
        setCartItems(cartItemsSanitized)

    }

    const updateCartItems = (items) => {
        setCartItems(items)
    }

    const clearCart = () => {
        setCartItems([])
    }

    return(
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems, updateCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)

    if(!context) {
        console.log('você está fora do contexto do carrinho')
    }

    return context
}