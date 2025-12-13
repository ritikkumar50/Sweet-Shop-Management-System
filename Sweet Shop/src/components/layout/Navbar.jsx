import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import ThemeToggle from './ThemeToggle';
import { LogOut, Cake, ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 py-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <Cake className="w-6 h-6 text-primary" />
                        <span className="font-serif font-bold text-xl text-[#4A3B32] dark:text-white">Sweet Delights</span>
                    </Link>

                    {/* Center Links */}
                    <div className="hidden md:flex items-center gap-12">
                        <Link to="/" className="text-[#4A3B32] dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors border-b-2 border-transparent hover:border-primary">
                            Home
                        </Link>
                        <Link to="/shop" className="text-[#4A3B32] dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors border-b-2 border-transparent hover:border-primary">
                            Shop
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        <Link to="/cart" className="relative group p-2">
                            <ShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-in zoom-in">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <ThemeToggle />

                        {user ? (
                            <div className="flex items-center gap-4">
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-sm font-medium text-[#4A3B32] dark:text-gray-300 hover:text-primary">
                                        Admin
                                    </Link>
                                )}
                                <span className="text-sm text-gray-500 hidden sm:inline">{user.name}</span>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-primary transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/login" className="text-accent dark:text-gray-300 font-medium hover:text-primary transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-[#E5633A] transition-all transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
