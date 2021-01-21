import {MAX_ITEMS} from '../../../helper';

const initialState = {
    allItems: [],
    pokemonItems: [],
    searchList: [],
    loading: false,
    error: '',
    more: true
};

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_POKEMON_BEGIN":
            return {
                ...state,
                loading: true
            }
        case "FETCH_POKEMON_SUCCESS":
            return {
                ...state,
                pokemonItems: state.pokemonItems.concat(action.payload),
                more: state.pokemonItems.length < MAX_ITEMS,
                loading: false
            }
        case "FETCH_POKEMON_FAILURE":
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "SEARCH_POKEMON_SUCCESS":
            return {
                ...state,
                searchList: action.payload,
                loading: false
            }
        case "SEARCH_POKEMON_FAILURE":
            return {
                ...state,
                loading: false
            }
        case "SEARCH_POKEMONS":
            return {
                ...state,
                searchList: action.payload
            }
        case "CLEAR":
            return {
                pokemonItems: [],
                localStoredPokemonItems: []
            }
        default:
            return state

    }
}

export {pokemonReducer};