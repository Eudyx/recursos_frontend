import { createContext, useState } from "react";

const IdContext = createContext({});

export const IdProvider = ({ children }) => {
    const [userId, setUserId] = useState('');

    return (
        <IdContext.Provider value={ {userId, setUserId} }>
            {children}
        </IdContext.Provider>
    )
}

export default IdContext;