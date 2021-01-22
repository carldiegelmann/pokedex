import React, {createContext, useReducer} from 'react';
import {BagReducer, sumItems} from './BagReducer';

export const BagContext = createContext()

const storage = localStorage.getItem('bag') ? JSON.parse(localStorage.getItem('bag')) : [];
const initialState = {bagItems: storage, ...sumItems(storage), checkout: false};

const BagContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(BagReducer, initialState)

    const addPokemon = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }

    const removePokemon = payload => {
        dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearBag = () => {
        dispatch({type: 'CLEAR'})
    }

    const contextValues = {
        removePokemon,
        addPokemon,
        clearBag,
        ...state
    }

    return (
        <BagContext.Provider value={contextValues} >
            { children}
        </BagContext.Provider>
    );
}

export default BagContextProvider;