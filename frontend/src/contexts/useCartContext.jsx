import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const addToCart = (itemToAdd) => {
        const checkItemAlready = cartItems.find((cartItem) => {
            return cartItem._id === itemToAdd._id;
        });

        if (!checkItemAlready) {
            itemToAdd.quantity = 1;
            setCartItems([...cartItems, itemToAdd]);

            Swal.fire({
                title: 'Prato adicionado ao carrinho com sucesso!',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3f2b25',
                confirmButtonText: 'Ir ao carrinho',
                cancelButtonText: 'Continuar comprando',
                cancelButtonColor: '#B18842',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/cart'); // Redireciona para a página de pedidos
                }
            });

        } else {
            Swal.fire({
                title: 'Atenção!',
                text: 'O item já está no carrinho, caso deseje adicionar mais um prato vá até o carrinho e altere a quantidade.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const removeFromCart = (itemId) => {
        const cartItemsSanitized = cartItems.filter((item) => {
            return item._id !== itemId;
        });

        setCartItems(cartItemsSanitized);
    };

    const updateCartItems = (items) => {
        setCartItems(items);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems, updateCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        alert('você está fora do contexto do carrinho');
    }

    return context;
};
