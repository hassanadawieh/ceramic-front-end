import React , { useState , createContext } from "react";

const MyContext = createContext();

export const DataProvider = ({ children}) => {
    const [categoryName , setCategoryName] = useState("All Categories");
    const [order , setOrder] = useState([]);

    return (
        <MyContext.Provider value={{ categoryName, setCategoryName, order, setOrder }}>
            {children}
        </MyContext.Provider>
    );
};


export default MyContext;