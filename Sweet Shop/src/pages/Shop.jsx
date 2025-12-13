import { useState, useEffect } from 'react';
import api from '../api/client';
import SweetCard from '../components/features/SweetCard';
import Input from '../components/ui/Input';
import { Search, Filter, Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { mockSweets } from '../data/mockData';

const Shop = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(100);

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

    const handlePurchase = async (sweet, quantity) => {
        try {
            const { data } = await api.post(`/sweets/${sweet._id}/purchase`, { quantity });

            // Update local state to reflect new quantity immediately
            setSweets(prevSweets =>
                prevSweets.map(s =>
                    s._id === sweet._id ? { ...s, quantity: data.data.quantity } : s
                )
            );

            alert(`Successfully purchased ${quantity} x ${sweet.name}!`);
        } catch (error) {
            console.error('Purchase error:', error);
            alert(error.response?.data?.message || 'Failed to purchase sweet');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 transition-colors duration-300">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
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
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl sticky top-24 border border-gray-100 dark:border-slate-700">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-[#4A3B32] dark:text-white font-serif font-bold text-xl">
                                    <SlidersHorizontal className="w-5 h-5" /> Filters
                                </div>
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
                                        <span className="text-sm text-gray-500 font-medium">$0 - ${priceRange}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
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
                                {filteredSweets.map(sweet => (
                                    <SweetCard
                                        key={sweet._id}
                                        sweet={sweet}
                                        onPurchase={handlePurchase}
                                    />
                                ))}
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
        </div>
    );
};

export default Shop;
