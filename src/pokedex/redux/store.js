import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import pokedexReducer from './reducers/pokedexReducer';

const rootReducer = combineReducers({
    pokedex: pokedexReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;