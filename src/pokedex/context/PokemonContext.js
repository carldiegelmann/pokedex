import React, {createContext, useReducer, useState} from 'react';
import {trackPromise} from "react-promise-tracker";
// import {fetchPokemons} from "./../redux/actions";
import {PokemonReducer} from './PokemonReducer'
import {getPokemonsWithFetch, fetchAdditionalData} from './api';

export const PokemonContext = createContext()

//const initialListSize = 2;
const initialListSize = 18;
const storage = localStorage.getItem('pokemonlist') ? JSON.parse(localStorage.getItem('pokemonlist')) : [];
const initialState = {pokemonItems: storage, searchList: [], allItems: []};

const PokemonContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(PokemonReducer, initialState)
    const [counterIndex, setCounterIndex] = useState(initialListSize);

    const loadInitialPokemonList = async () => {
        const allItems = await trackPromise(getPokemonsWithFetch());
        if (allItems) {
            const subset = allItems.slice(0, counterIndex);
            const itemsWithImages = await Promise.all(subset.map((obj) => trackPromise(fetchAdditionalData(obj.url)))).then((responses) => {
                return subset.map((currElement, index) => ({...currElement, image: responses[index].imageUrl, types: responses[index].types, stats: responses[index].stats, moves: responses[index].moves}));
            }); {
                dispatch({type: 'LOAD_INIT', allItems, itemsWithImages});
            }
            // ERROR DISPATCH
            //dispatch({type: 'LOAD_ITEMS', itemsWithImages})
        }
    }

    const fetchMorePokemon = async () => {
        const items = await trackPromise(getPokemonsWithFetch());
        if (items) {
            const nextIndex = initialListSize + counterIndex;
            const subset = items.slice(counterIndex, nextIndex);

            const itemsWithImages = await Promise.all(subset.map((obj) => trackPromise(fetchAdditionalData(obj.url)))).then((responses) => {
                return subset.map((currElement, index) => ({...currElement, image: responses[index].imageUrl, types: responses[index].types, stats: responses[index].stats, moves: responses[index].moves}));
            });
            setCounterIndex(nextIndex)
            dispatch({type: 'LOAD_MORE', itemsWithImages})
        }
        // ERROR DISPATCH
        //dispatch({type: 'LOAD_ITEMS', itemsWithImages})
    }

    const searchPokemonList = async (itemsWithImages) => {
        dispatch({type: 'SEARCH_POKEMONS', itemsWithImages})
    }

    const contextValues = {
        loadInitialPokemonList,
        fetchMorePokemon,
        searchPokemonList,
        ...state
    }

    return (
        <PokemonContext.Provider value={contextValues} >
            { children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;