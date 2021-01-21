const BASE_API = 'https://pokeapi.co/api/';

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export const getPokemonsWithFetch = async () => {
    const response = await fetch(BASE_API + 'v2/pokemon/?limit=1118', headers);
    const jsonData = await response.json();
    const data = jsonData.results;
    const dataWithId = data.map((currElement, index) => ({...currElement, id: index + 1}));
    return (dataWithId);
};

export const getPokemonDataWithUrl = async (url) => {
    const response = await fetch(url, headers);
    const jsonData = await response.json();
    return (jsonData);
};

export const getPokemonDescriptionWithId = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`, headers);
    const jsonData = await response.json();
    return (jsonData);
};

export const fetchAdditionalData = async (url) => {

    try {
        const response = await getPokemonDataWithUrl(url);
        return {imageUrl: response.sprites.front_default, types: response.types.map((type) => type.type.name), stats: response.stats, moves: response.moves};
    } catch (err) {
        console.error('err', err);
    }
}