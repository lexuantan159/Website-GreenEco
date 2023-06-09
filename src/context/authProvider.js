import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    console.log(auth);

    window.addEventListener('beforeunload', () => {
        const myDataString = JSON.stringify(auth);
        localStorage.setItem('auth', myDataString);
    });

    useEffect(() => {
        const myDataString = localStorage.getItem('auth');
        if (myDataString) {
            const myDataObject = JSON.parse(myDataString);
            setAuth(myDataObject);
        }
    }, []);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
