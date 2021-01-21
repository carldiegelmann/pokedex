import {getPokemonsWithFetch, fetchAdditionalData} from './api';

const fetchSize = 18;

const Storage = (items) => {
    localStorage.setItem('allPokemons', JSON.stringify(items.length > 0 ? items : []));
}

export const fetchInitial = () => {
    return new Promise((resolve, reject) => {
        const storage = localStorage.getItem('allPokemons') ? JSON.parse(localStorage.getItem('allPokemons')) : [];
        if (storage && storage.length > 0) {
            resolve(storage);
        } else {
            getPokemonsWithFetch().then(items => {
                Storage(items);
                resolve(items);
            });
        }
    })
}

export const fetchPokemon = (cursor) => {
    return dispatch => {
        dispatch(fetchPokemonPending());
        fetchInitial()
            .then(items => {
                const subset = items.slice(cursor, cursor + fetchSize)
                Promise.all(subset.map((obj) => fetchAdditionalData(obj.url, obj.id))).then((response) => {
                    return subset.map((currElement, index) => {
                        let image = response[index];
                        if (!image) {
                            image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
                        } else {
                            image = response[index].imageUrl;
                        }
                        console.log(response[index]);
                        return ({...currElement, image, types: response[index].types, stats: response[index].stats, moves: response[index].moves, desc: response[index].desc})
                    });
                }).then(items => {
                    dispatch(fetchPokemonSuccess(items));
                });
            })
            .catch(error => {
                dispatch(fetchPokemonError(error));
            })
    }
}

export const searchPokemonList = (searchTerm) => {
    return dispatch => {
        dispatch(fetchPokemonPending());
        fetchInitial().then(items => {
            const allItemsFiltered = items.filter((item) => {return item.name.toLowerCase().includes(searchTerm)});
            if (allItemsFiltered.length === 0 || searchTerm.length === 0 || allItemsFiltered.length === items.length) {
                dispatch(searchPokemonSuccess([]));
            } else {
                Promise.all(allItemsFiltered.map((obj) => fetchAdditionalData(obj.url, obj.id))).then((responses) => {
                    return allItemsFiltered.map((currElement, index) => {
                        let image = responses[index];
                        if (!image) {
                            image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
                        } else {
                            image = responses[index].imageUrl;
                        }
                        console.log(responses[index]);
                        return ({...currElement, image, types: responses[index].types, stats: responses[index].stats, moves: responses[index].moves, desc: responses[index].desc})
                    });
                }).then(items => {
                    dispatch(searchPokemonSuccess(items));
                }).catch(error => {
                    dispatch(searchPokemonError(error));
                })
            }
        })
    }
}

export function fetchPokemonInitialSuccess(allItems) {
    return {
        type: 'FETCH_INITIAL_POKEMON_SUCCESS',
        payload: allItems
    };
}

export function fetchPokemonPending() {
    return {
        type: 'FETCH_POKEMON_BEGIN'
    };
}

export function fetchPokemonSuccess(pokemon) {
    return {
        type: 'FETCH_POKEMON_SUCCESS',
        payload: pokemon
    };
}

export function fetchPokemonError(error) {
    return {
        type: 'FETCH_POKEMON_FAILURE',
        payload: error
    };
}

export function searchPokemonSuccess(items) {
    return {
        type: 'SEARCH_POKEMON_SUCCESS',
        payload: items
    };
}

export function searchPokemonError(error) {
    return {
        type: 'SEARCH_POKEMON_FAILURE',
        payload: error
    };
}

