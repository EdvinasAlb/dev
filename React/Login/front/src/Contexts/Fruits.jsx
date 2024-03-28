import { createContext, useState } from 'react';
import useFruits from '../Hooks/useFruits';

export const Fruits = createContext();

export const FruitsProvider = ({ children }) => {



    const { fruits, setFruits, createFruit, setCreateFruit, editFruit, setEditFruit, deleteFruit, setDeleteFruit } = useFruits();



    return (
        <Fruits.Provider value={{
            fruits, setFruits,
            createFruit, setCreateFruit,
            editFruit, setEditFruit,
            deleteFruit, setDeleteFruit

        }}>
            {children}
        </Fruits.Provider>
    );
}