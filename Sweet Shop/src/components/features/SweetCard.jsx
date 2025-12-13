import Button from '../ui/Button';
import { ShoppingCart, Ban } from 'lucide-react';

const SweetCard = ({ sweet, onPurchase }) => {
    const isOutOfStock = sweet.quantity === 0;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-slate-700 flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform -rotate-12 border-2 border-white">
                            Sold Out
                        </span>
                    </div>
                )}
                {!isOutOfStock && sweet.quantity < 5 && (
                    <div className="absolute top-2 right-2">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                            Only {sweet.quantity} left!
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1" title={sweet.name}>
                        {sweet.name}
                    </h3>
                    <span className="text-primary font-bold text-lg">
                        ${sweet.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {sweet.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-700">
                    <Button
                        className="w-full"
                        variant={isOutOfStock ? 'ghost' : 'primary'}
                        disabled={isOutOfStock}
                        onClick={() => onPurchase(sweet)}
                        icon={isOutOfStock ? Ban : ShoppingCart}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
