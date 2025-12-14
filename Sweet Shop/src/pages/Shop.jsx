import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import SweetCard from '../components/features/SweetCard';
import Input from '../components/ui/Input';
import LottieLoader from '../components/ui/LottieLoader';
import { Search, Filter, Loader2, SlidersHorizontal, ChevronDown, ShoppingCart } from 'lucide-react';
import { mockSweets } from '../data/mockData';
import FoodLoadingAnimation from '../assets/animations/FoodLoading.json';

const Shop = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(1000);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch from API
    useEffect(() => {
        const fetchSweets = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/sweets');
                setSweets(data.data);
            } catch (error) {
                console.error('Error fetching sweets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSweets();
    }, []);

    const categories = ['All', ...new Set(sweets.map(s => s.category))];

    const filteredSweets = sweets.filter(sweet => {
        const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
        const matchesPrice = sweet.price <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const { addToCart, cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleAddToCart = (sweet, quantity, weight = '1kg', isBuyNow = false) => {
        if (!user) {
            navigate('/login');
            return;
        }
        addToCart(sweet, quantity, weight);

        if (isBuyNow) {
            navigate('/cart');
        } else {
            addToast(`Added ${quantity} x ${sweet.name} (${weight}) to cart!`);
        }
    };

    const getAdjustedQuantity = (sweet) => {
        const inCartQty = cart
            .filter(item => item._id === sweet._id)
            .reduce((total, item) => total + item.quantity, 0);
        return Math.max(0, sweet.quantity - inCartQty);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-900 transition-colors duration-300">
                <LottieLoader animationData={FoodLoadingAnimation} size={250} />
                <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                    Loading delicious sweets...
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFBF9] dark:bg-slate-900 min-h-screen transition-colors duration-300">
            <div className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 py-12 px-4 mb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3B32] dark:text-white mb-2">Our Sweet Collection</h1>
                    <p className="text-gray-500 dark:text-gray-400">Showing {filteredSweets.length} of {sweets.length} sweets</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden w-full flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4"
                        >
                            <span className="flex items-center gap-2 font-bold text-[#4A3B32] dark:text-white">
                                <SlidersHorizontal className="w-5 h-5 text-primary" /> Filters
                            </span>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white dark:bg-slate-800 p-6 rounded-2xl sticky top-24 border border-gray-100 dark:border-slate-700 shadow-sm lg:shadow-none`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-[#4A3B32] dark:text-white font-serif font-bold text-xl hidden lg:flex">
                                    <SlidersHorizontal className="w-5 h-5" /> Filters
                                </div>
                                <div className="lg:hidden font-bold text-[#4A3B32] dark:text-white">Filter Options</div>
                                {(searchTerm || selectedCategory !== 'All' || priceRange !== 100) && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCategory('All');
                                            setPriceRange(100);
                                        }}
                                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search</label>
                                    <Input
                                        placeholder="Search sweets..."
                                        icon={Search}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-gray-50 dark:bg-slate-700"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Category</label>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full appearance-none bg-gray-50 dark:bg-slate-700 border border-transparent focus:border-primary rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-white outline-none cursor-pointer"
                                            >
                                                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Availability</label>
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none bg-gray-50 dark:bg-slate-700 border border-transparent focus:border-primary rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-white outline-none cursor-pointer"
                                        >
                                            <option>All Items</option>
                                            <option>In Stock</option>
                                            <option>Out of Stock</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                                        <span className="text-sm text-gray-500 font-medium">₹0 - ₹{priceRange}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {filteredSweets.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredSweets.map(sweet => {
                                    const adjustedSweet = { ...sweet, quantity: getAdjustedQuantity(sweet) };
                                    return (
                                        <SweetCard
                                            key={sweet._id}
                                            sweet={adjustedSweet}
                                            onPurchase={handleAddToCart}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
                                <div className="w-16 h-16 bg-secondary dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Filter className="w-8 h-8 text-primary opacity-50" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">No sweets found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Floating Cart Button (Mobile) */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                <Link
                    to="/cart"
                    className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-2xl hover:bg-[#E5633A] transition-all transform hover:scale-105"
                >
                    <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {cart.reduce((Acc, Item) => Acc + Item.quantity, 0) > 0 && (
                            <span className="absolute -top-3 -right-3 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border border-orange-100">
                                {cart.reduce((Acc, Item) => Acc + Item.quantity, 0)}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Shop;
