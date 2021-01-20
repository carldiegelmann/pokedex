
const Storage = (pokemonItems) => {
    localStorage.setItem('pokemonlist', JSON.stringify(pokemonItems.length > 0 ? pokemonItems : []));
}

export const PokemonReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_INIT":
            const pokemonItems = action.itemsWithImages;
            console.log(pokemonItems);
            Storage(pokemonItems);
            return {
                ...state,
                localStoredPokemonItems: pokemonItems,
                pokemonItems: pokemonItems,
                allItems: action.allItems,
                searchList: []
            }
        case "LOAD_MORE":
            const allItems = state.localStoredPokemonItems.concat(action.itemsWithImages)
            console.log(allItems);
            Storage(allItems);
            return {
                ...state,
                localStoredPokemonItems: allItems,
                pokemonItems: allItems
            }
        case "SEARCH_POKEMONS":
            return {
                ...state,
                searchList: action.itemsWithImages
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