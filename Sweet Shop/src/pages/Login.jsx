import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Lock, AlertCircle, Cake, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFBF9] dark:bg-slate-900 transition-colors duration-300">
            <div className="w-full max-w-lg">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 group mb-6">
                        <Cake className="w-8 h-8 text-primary" />
                        <span className="font-serif font-bold text-3xl text-accent dark:text-white">Parampara Sweets</span>
                    </Link>
                    <h2 className="text-4xl font-serif font-bold text-accent dark:text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Sign in to satisfy your sweet cravings
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl shadow-orange-100/50 dark:shadow-none border border-white dark:border-slate-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <Input
                                id="email"
                                type="email"
                                label="Email Address"
                                placeholder="you@example.com"
                                icon={Mail}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={loading}
                                required
                                className="bg-[#FFFBF9] dark:bg-slate-700 border-transparent focus:bg-white transition-all"
                            />

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    placeholder="••••••••"
                                    icon={Lock}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    disabled={loading}
                                    required
                                    className="bg-[#FFFBF9] dark:bg-slate-700 border-transparent focus:bg-white transition-all pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-primary hover:text-[#E5633A]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3.5 text-base rounded-2xl"
                            isLoading={loading}
                        >
                            Sign In
                        </Button>

                        <div className="text-center text-sm">
                            <p className="text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-medium text-primary hover:text-[#E5633A]">
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
