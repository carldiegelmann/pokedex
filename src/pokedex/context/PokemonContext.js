import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {trackPromise} from "react-promise-tracker";
//import {dummyPokemon} from '../services/dummy';
import {fetchPokemons} from "./../redux/actions";
import {useReducerWithThunk} from './thunk';
import pokedexReducer from './../redux/reducers/pokedexReducer'
import {getPokemonsWithFetch} from './api';

export const PokemonContext = createContext()


const PokemonContextProvider = ({children}) => {
    const [state, setState] = useState({status: 'LOADING', items: []});

    // // Dispatch
    // const dispatch = useDispatch();

    // useEffect(async () => {
    //     const result = dispatch(fetchPokemons());
    //     setData(result.data);
    // });
    // //const [pokemons] = useState(dummyPokemon);

    // Async action creator
    // const fetchData = () => async (dispatch) => {
    //     //dispatch({type: "FETCH_POKEMONS_BEGIN"});
    //     dispatch(fetchPokemons());
    // }

    const fetch = async () => {
        try {
            const result = await getPokemonsWithFetch();
            if (result.results) {
                setState({
                    status: 'LOADED',
                    items: result.results,
                });
            } else {
                setState({status: 'ERROR'});
            }
        } catch (err) {
            console.error('err', err);
        }
    }

    // const initialState = {items: []};
    // const [state, dispatch] = useReducerWithThunk(pokedexReducer, initialState);

    useEffect(async () => {
        console.log('load pokemons')
        setState({status: 'LOADING '});
        trackPromise(fetch());
    }, [])

    console.log(state);
    return (
        <PokemonContext.Provider value={state.items} >
            { children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;