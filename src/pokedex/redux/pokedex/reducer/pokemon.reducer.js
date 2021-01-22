import {FETCH_POKEMON_BEGIN, FETCH_POKEMON_SUCCESS, FETCH_POKEMON_FAILURE, SEARCH_POKEMON_SUCCESS, SEARCH_POKEMON_FAILURE} from '../../actionTypes';


const initialState = {
    allItems: [],
    pokemonItems: [],
    searchList: [],
    loading: false,
    error: ''
};

const pokemonListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEMON_BEGIN:
            return {
                ...state,
                loading: true
            }
        case FETCH_POKEMON_SUCCESS:
            return {
                ...state,
                pokemonItems: state.pokemonItems.concat(action.payload),
                loading: false
            }
        case FETCH_POKEMON_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case SEARCH_POKEMON_SUCCESS:
            return {
                ...state,
                searchList: action.payload,
                loading: false
            }
        case SEARCH_POKEMON_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state

    }
}

export {pokemonListReducer};