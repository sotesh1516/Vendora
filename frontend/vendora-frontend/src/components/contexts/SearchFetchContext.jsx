import { useState, createContext } from "react";
import React from "react";

export const SearchFetchContext = createContext();

// this set up is done to make the migration from using local storage to useContext or other react features easier
export const SearchFetchProvider = ({ children }) => {

    const [searchFetch, setSearchFetch] = useState(null);

    return (
        <>
            <SearchFetchContext.Provider value={{ searchFetch, setSearchFetch }}>
                {children}
            </SearchFetchContext.Provider>
        </>
    )

}