import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Mocking user state for now. In a real app, check localStorage or validate token.
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Mock login function
    const login = async (email, password) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simple mock validation
                if (password === 'password') {
                    const mockUser = { id: 1, email, role: email.includes('admin') ? 'admin' : 'customer', name: 'Test User' };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
                setLoading(false);
            }, 1000);
        });
    };

    // Mock register function
    const register = async (name, email, password) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = { id: Date.now(), email, name, role: 'customer' };
                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                resolve(mockUser);
                setLoading(false);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Check for persisted user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
