"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface User {
    name: string;
    email: string;
    photoURL: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof localStorage !== 'undefined') {
            // Check if window object is available (client-side)
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            // Check if window object is available (client-side)
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
