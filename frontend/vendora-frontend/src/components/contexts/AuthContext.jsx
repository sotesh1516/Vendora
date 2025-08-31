import React, { useState, useContext, createContext } from "react";
import { setTokenHandler } from "../../api/refresh";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState("");
    setTokenHandler(accessToken, setAccessToken);
    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}