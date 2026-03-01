import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ✅ Safe user initialization
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");

            if (!storedUser || storedUser === "undefined") {
                return null;
            }

            return JSON.parse(storedUser);
        } catch (error) {
            console.log("Invalid user in localStorage");
            localStorage.removeItem("user");
            return null;
        }
    });

    const [accessToken, setAccessToken] = useState(() => {
        const token = localStorage.getItem("accessToken");
        return token || null;
    });

    const [loading, setLoading] = useState(true);

    // ✅ Restore auth state on app load
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedAccessToken = localStorage.getItem("accessToken");

            if (
                storedUser &&
                storedUser !== "undefined" &&
                storedAccessToken
            ) {
                setUser(JSON.parse(storedUser));
                setAccessToken(storedAccessToken);
            }
        } catch (error) {
            console.log("Error restoring auth state");
            localStorage.clear();
            setUser(null);
            setAccessToken(null);
        }

        setLoading(false);
    }, []);

    // ✅ Login function
    const login = (data) => {
        setUser(data.user);
        setAccessToken(data.accessToken);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);

        if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
        }
    };

    // ✅ Logout function
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                login,
                logout,
                loading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
