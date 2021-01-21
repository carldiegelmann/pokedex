import {applyMiddleware, combineReducers, createStore} from "redux";
import {pokemonReducer} from "./pokedex/reducer";
import {pokemonMiddleware} from "./pokedex/middleware";
import thunk from 'redux-thunk';

const middlewares = [pokemonMiddleware, thunk];

const rootReducer = combineReducers({
    pokedex: pokemonReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middlewares));
store.subscribe(() => {
    store.getState()
    // console.log(store.getState());
});
export {store};