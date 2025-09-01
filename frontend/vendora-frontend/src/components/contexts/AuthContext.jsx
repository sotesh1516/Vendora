import React, { useState, useContext, createContext, useEffect } from "react";
import { setTokenHandler } from "../../api/refresh";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState("");
    
    useEffect(() => {
        setTokenHandler(
          () => accessToken,         // getter: called by Axios before requests
          (token) => setAccessToken(token) // setter: called by refresh interceptor
        );
      }, [accessToken]);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}