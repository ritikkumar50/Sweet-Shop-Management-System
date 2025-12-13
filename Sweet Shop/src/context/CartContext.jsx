import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);

    // Load cart from local storage when user changes
    useEffect(() => {
        if (user) {
            const storedCart = localStorage.getItem(`cart_${user._id}`);
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            } else {
                setCart([]);
            }
        } else {
            setCart([]); // Clear cart if no user
        }
    }, [user]);

    // Save cart to local storage whenever it changes (only if user exists)
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = (product, quantity) => {
        if (!user) return; // Optional: redirect to login or handle guest cart later

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
