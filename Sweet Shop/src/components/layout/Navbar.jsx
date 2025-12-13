import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShoppingBag, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity">
                        <ShoppingBag className="w-6 h-6" />
                        <span>SweetShop</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">
                            Menu
                        </Link>

                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="flex items-center gap-1 text-slate-700 hover:text-primary font-medium transition-colors">
                                        <Shield className="w-4 h-4" />
                                        Admin
                                    </Link>
                                )}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">Hi, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="sr-only sm:not-sr-only text-sm font-medium">Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-pink-600 hover:shadow-lg transition-all active:scale-95"
                                >
                                    Sign Up
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
