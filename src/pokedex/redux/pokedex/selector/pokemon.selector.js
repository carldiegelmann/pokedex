import {createSelector} from "reselect";

const getPokedex = (state) => state.pokedex;

const pokemonSelector = createSelector([getPokedex], (pokedex) => pokedex);

export {pokemonSelector};