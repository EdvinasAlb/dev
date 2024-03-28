import { createContext, useState } from 'react';


export const Auth = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(_ => {
        const token = window.localStorage.getItem('token');
        const user = window.localStorage.getItem('user');
        const role = window.localStorage.getItem('role');
        const id = window.localStorage.getItem('id');
        return token ? {
            token,
            user,
            role,
            id
        } : null;
    });

    const logout = _ => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('id');
        setUser(null);
        window.location.href = '#login';
    }

    const login = (token, user, role, id) => {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', user);
        window.localStorage.setItem('role', role);
        window.localStorage.setItem('id', id);
        setUser({
            token,
            user,
            role,
            id
        });
    }

    return (
        <Auth.Provider value={{ user, setUser, logout, login }}>
            {children}
        </Auth.Provider>
    );
}
