import { useState } from 'react';
import Button from '../ui/Button';
import { ShoppingCart, Ban, Minus, Plus } from 'lucide-react';

const SweetCard = ({ sweet, onPurchase }) => {
    const isOutOfStock = sweet.quantity === 0;
    const [purchaseQty, setPurchaseQty] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState('1kg');

    const priceMultiplier = selectedWeight === '250g' ? 0.25 : selectedWeight === '500g' ? 0.5 : 1;
    const displayPrice = sweet.price * priceMultiplier;

    const handleIncrement = () => {
        if (purchaseQty < sweet.quantity) {
            setPurchaseQty(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (purchaseQty > 1) {
            setPurchaseQty(prev => prev - 1);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden group flex flex-col h-full transform transition-all duration-300 hover:shadow-xl">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-white/90 text-primary px-4 py-2 rounded-full text-sm font-bold shadow-sm uppercase tracking-widest">
                            Sold Out
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    <h3 className="text-2xl font-serif text-[#4A3B32] dark:text-gray-100 mb-1" title={sweet.name}>
                        {sweet.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{sweet.category}</p>
                    {!isOutOfStock && <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-1">Available: {sweet.quantity}</p>}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 flex-grow">
                    {sweet.description}
                </p>

                <div className="mt-auto">
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Select Weight</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['250g', '500g', '1kg'].map(weight => (
                                <button
                                    key={weight}
                                    onClick={() => setSelectedWeight(weight)}
                                    className={`px-2 py-1 text-xs font-bold rounded-lg border transition-all ${selectedWeight === weight
                                        ? 'bg-primary text-white border-primary shadow-sm'
                                        : 'bg-transparent text-gray-500 border-gray-200 dark:border-slate-600 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {weight}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-primary font-bold text-2xl font-serif">
                            ₹{displayPrice.toFixed(2)}
                        </span>

                        {!isOutOfStock && (
                            <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-full px-2 py-1">
                                <button
                                    onClick={handleDecrement}
                                    disabled={purchaseQty <= 1}
                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-medium text-gray-800 dark:text-white w-6 text-center text-lg">{purchaseQty}</span>
                                <button
                                    onClick={handleIncrement}
                                    disabled={purchaseQty >= sweet.quantity}
                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            className="w-full py-3 rounded-xl text-base font-bold shadow-md"
                            variant={isOutOfStock ? 'ghost' : 'outline'}
                            disabled={isOutOfStock}
                            onClick={() => onPurchase(sweet, purchaseQty, selectedWeight, false)}
                        >
                            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                        {!isOutOfStock && (
                            <Button
                                className="w-full py-3 rounded-xl text-base font-bold shadow-lg bg-green-600 hover:bg-green-700 text-white border-transparent"
                                onClick={() => onPurchase(sweet, purchaseQty, selectedWeight, true)}
                            >
                                Buy Now
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
