import { useState, createContext } from "react";
import React from "react";

const UserContext = createContext();

export const UserProvider = () => {

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}