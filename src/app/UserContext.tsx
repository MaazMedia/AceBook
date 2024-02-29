"use client"
import React, { createContext, useState, useEffect, useContext } from "react";

interface User {
    name: string,
    email: string,
    photoURL: string
}


interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Initialize user state from localStorage
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Update localStorage whenever user state changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
