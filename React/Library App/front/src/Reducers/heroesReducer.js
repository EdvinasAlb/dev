import * as constants from "../Constants/heroes";
import { SERVER_URL } from "../Constants/main";

export default function heroesReducer(state, action) {
  let newState = structuredClone(state ? state : []);

  let hero = null;

  switch (action.type) {
    //Show
    case constants.GET_HEROES_FROM_SERVER:
      newState = action.payload.map((hero) => {
        hero.image = hero.image ? SERVER_URL + "/" + hero.image : null;
        hero.author = {};
        hero.book = {};
        hero.author.name = hero.authorName;
        hero.author.surname = hero.authorSurname;
        hero.book.title = hero.title;
        delete hero.authorName;
        delete hero.authorSurname;
        delete hero.title;
        return hero;
      });
      break;

    //Create
    case constants.CREATE_HERO:
      newState.unshift({ ...action.payload, temp: true });
      break;

    //Create
    case constants.CREATE_HERO_REAL:
      hero = newState.find((hero) => hero.id === action.payload.uuid);

      if (hero) {
        delete hero.temp;
        hero.id = action.payload.id;
      }
      break;

    //Create
    case constants.CREATE_HERO_UNDU:
      newState = newState.filter((hero) => hero.id !== action.payload.id);
      break;

    //Delete
    case constants.DELETE_HERO:
      hero = newState.find((hero) => hero.id === action.payload.id);
      if (hero) {
        hero.deleted = true;
      }
      break;

    //Delete
    case constants.DELETE_HERO_REAL:
      newState = newState.filter((hero) => hero.id !== action.payload.id);
      break;

    //Delete
    case constants.DELETE_HERO_UNDU:
      hero = newState.find((hero) => hero.id === action.payload.id);
      if (hero) {
        delete hero.deleted;
      }
      break;

    //Update
    //Begining
    case constants.UPDATE_HERO:
      hero = newState.find((hero) => hero.id === action.payload.id); //Find hero
      if (hero) {
        for (let key in action.payload) {
          hero[key] = action.payload[key];
        }
        hero.temp = true;
      }
      break;

    //Update
    case constants.UPDATE_HERO_REAL:
      hero = newState.find((hero) => hero.id === action.payload.id);
      if (hero) {
        delete hero.temp;
        delete hero.old;
      }
      break;

    //Update
    case constants.UPDATE_HERO_UNDU:
      hero = newState.find((hero) => hero.id === action.payload.id);
      if (hero) {
        for (let key in action.payload.old) {
          hero[key] = action.payload.old[key];
        }
        delete hero.temp;
        delete hero.old;
      }
      break;
    default:
  }
  return newState;
}
