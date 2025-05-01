// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log('Auth State Changed:', user ? `User logged in (${user.uid})` : 'User logged out');
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const getIdToken = async () => {
        if (!currentUser) {
            console.warn("getIdToken: No current user.");
            return null;
        }
        try {
            const token = await currentUser.getIdToken(true); // Force refresh if needed
            return token;
        } catch (error) {
            console.error("Error getting ID token:", error);
            return null;
        }
    };


    const value = {
        currentUser,
        loading,
        getIdToken // Expose function to get token
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
