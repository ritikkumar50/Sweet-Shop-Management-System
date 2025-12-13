import { useState, useEffect } from 'react';
import SweetCard from '../components/features/SweetCard';
import Input from '../components/ui/Input';
import { Search, Filter, Loader2 } from 'lucide-react';
import { mockSweets } from '../data/mockData';

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Simulate API fetch
    useEffect(() => {
        const fetchSweets = async () => {
            setLoading(true);
            setTimeout(() => {
                setSweets(mockSweets);
                setLoading(false);
            }, 800);
        };
        fetchSweets();
    }, []);

    const categories = ['All', ...new Set(mockSweets.map(s => s.category))];

    const filteredSweets = sweets.filter(sweet => {
        const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handlePurchase = (sweet) => {
        alert(`Added ${sweet.name} to cart! (This is a demo)`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="pb-12 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-orange-400 text-white py-16 px-4 mb-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Sweeten Your Day
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                        Explore our curated collection of handcrafted desserts, made with love and perfectly sweet ingredients.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-full md:w-96">
                        <Input
                            placeholder="Search for sweets..."
                            icon={Search}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-50 border-transparent focus:bg-white"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {filteredSweets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSweets.map(sweet => (
                            <SweetCard
                                key={sweet.id}
                                sweet={sweet}
                                onPurchase={handlePurchase}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No sweets found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
