import * as constants from "../Constants/heroes";
//Show
export function getHeroes(heroes) {
  return {
    type: constants.GET_HEROES_FROM_SERVER,
    payload: heroes,
  };
}

//Create
export function storeHeroAsTemp(hero) {
  return {
    type: constants.CREATE_HERO,
    payload: hero,
  };
}

//Create
export function storeHeroAsReal(response) {
  return {
    type: constants.CREATE_HERO_REAL,
    payload: response,
  };
}

//Create
export function storeHeroAsUndu(hero) {
  return {
    type: constants.CREATE_HERO_UNDU,
    payload: hero,
  };
}

//Delete
export function deleteHeroAsTemp(hero) {
  return {
    type: constants.DELETE_HERO,
    payload: hero,
  };
}

//Delete
export function deleteHeroAsReal(response) {
  return {
    type: constants.DELETE_HERO_REAL,
    payload: response,
  };
}

//Delete
export function deleteHeroAsUndo(hero) {
  return {
    type: constants.DELETE_HERO_UNDU,
    payload: hero,
  };
}

//Edit
export function updateHeroAsTemp(hero) {
  return {
    type: constants.UPDATE_HERO,
    payload: hero,
  };
}

//Edit
export function updateHeroAsReal(response) {
  return {
    type: constants.UPDATE_HERO_REAL,
    payload: response,
  };
}

//Edit
export function updateHeroAsUndu(hero) {
  return {
    type: constants.UPDATE_HERO_UNDU,
    payload: hero,
  };
}
