import React, {createContext, useReducer} from 'react';
import {CartReducer, sumItems} from './CartReducer';

export const CartContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = {cartItems: storage, ...sumItems(storage), checkout: false};

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const addPokemon = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }

    const removePokemon = payload => {
        dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR'})
    }

    const contextValues = {
        removePokemon,
        addPokemon,
        clearCart,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            { children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;