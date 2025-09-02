import React, { useState, useContext, createContext, useEffect } from "react";
import { setTokenHandler } from "../../api/refresh";

const AuthContext = createContext(null);
const STORAGE_KEY = "accessToken";

// User logs in
//      You get an accessToken.
//      Context sets it: setAccessToken(token).
//      Your code hits the if (token) branch → token is saved to sessionStorage.
// User logs out
//      You call something like setAccessToken(null).
//      Now token is falsy.
//      Your code hits the else branch → sessionStorage.removeItem(STORAGE_KEY) runs.
//      This clears the token from browser memory as well

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");

    //keep the session storage in sync
    useEffect(()=> {
        if (accessToken) {
            sessionStorage.setItem(STORAGE_KEY, accessToken);
        }
        else {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }, [accessToken]);
    
    useEffect(() => {

        function getter() {
            return sessionStorage.getItem(STORAGE_KEY) || "";
        }

        function setter(accessToken) {

            if (accessToken)
            {
                sessionStorage.setItem(STORAGE_KEY, ) || "";
            }
            else {
                sessionStorage.removeItem(STORAGE_KEY); // not to end up with a stale token if it doesn't exist clear everything
            }
            setAccessToken(token || "");
            
        }
        setTokenHandler(
          getter,         // getter: called by Axios before requests
          setter // setter: called by refresh interceptor
        );
      }, []); // run on mount

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}