import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Default to true to check for token on mount

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            setUser(data.user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            setUser(data.user);
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // Check for persisted user/token on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                // In a production app, you might want to verify the token with an API call here
                // e.g., await api.get('/auth/me');
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Update localStorage when user changes (to keep user data in sync if updated)
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            // Only remove if we explicitly logged out or user is null, 
            // but be careful not to wipe it on initial load before checkAuth.
            // handled by checkAuth logic mostly, but good to keep clear.
            if (!loading) {
                // If not loading, and user is null, ensure storage is clear
                // (This is redundant with logout() but safe)
            }
        }
    }, [user, loading]);

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
