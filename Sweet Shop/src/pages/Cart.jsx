import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import Button from '../components/ui/Button';
import LottieLoader from '../components/ui/LottieLoader';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import TruckAnimation from '../assets/animations/Truck.json';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            // Process each item purchase
            // Ideally this would be a single batch API call, but we'll loop for now
            // based on existing single-item endpoints
            for (const item of cart) {
                await api.post(`/sweets/${item._id}/purchase`, { quantity: item.quantity });
            }
            alert('Purchase successful!');
            clearCart();
            navigate('/shop');
        } catch (error) {
            console.error('Checkout error:', error);
            alert(error.response?.data?.message || 'Failed to complete purchase. Some items may be out of stock.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#FFFBF9] dark:bg-slate-900 p-4 transition-colors duration-300">
                <div className="w-24 h-24 bg-orange-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-12 h-12 text-primary opacity-50" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#4A3B32] dark:text-white mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Looks like you haven't added any sweets yet.
                </p>
                <Button onClick={() => navigate('/shop')}>
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBF9] dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-[#4A3B32] dark:text-white mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                                />
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-full px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium text-gray-800 dark:text-white w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Tax (10%)</span>
                                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-slate-700 pt-3 flex justify-between font-bold text-lg text-[#4A3B32] dark:text-white">
                                    <span>Total</span>
                                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleCheckout}
                                className="w-full py-4 text-base rounded-xl font-bold shadow-lg"
                                isLoading={loading}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Loading Overlay with Truck Animation */}
                {loading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl">
                            <LottieLoader animationData={TruckAnimation} size={300} />
                            <p className="text-center mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                                Processing your order...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
