"use client";

import axiosInstance from "@/utils/axiosInstance";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface User {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get("/auth/me");
                setUser(res.data.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await axiosInstance.post("/auth/login", { email, password });

            const res = await axiosInstance.get("/auth/me");

            setUser(res.data.data);
        } catch (err) {
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await axiosInstance.post("/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
