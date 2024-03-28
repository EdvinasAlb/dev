import { createContext, useReducer, useState } from "react";
import heroesReducer from "../Reducers/heroesReducer";
import useHeroes from "../Hooks/useHeroes";

export const Heroes = createContext();

export const HeroesProvider = ({ children }) => {
  const [heroes, dispachHeroes] = useReducer(heroesReducer, null);
  const [deleteHero, setDeleteHero] = useState(null);
  const [editHero, setEditHero] = useState(null);

  const {
    storeHero,
    setStoreHero,
    updateHero,
    setUpdateHero,
    destroyHero,
    setDestroyHero,
  } = useHeroes(dispachHeroes);

  return (
    <Heroes.Provider
      value={{
        heroes,
        dispachHeroes,
        storeHero,
        setStoreHero,
        updateHero,
        setUpdateHero,
        destroyHero,
        setDestroyHero,
        deleteHero,
        setDeleteHero,
        editHero,
        setEditHero,
      }}
    >
      {children}
    </Heroes.Provider>
  );
  //3
};
