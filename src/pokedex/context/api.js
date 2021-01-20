const BASE_API = 'https://pokeapi.co/api/';

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// return fetch('https://randomuser.me/api/')
//       .then(results => results.json())
//       .then(data => {
//         const {name} = data.results[0];
//         setFirstName(name.first);
//         setLastName(name.last);
//       });

export const getPokemonsWithFetch = async () => {
    const response = await fetch(BASE_API + 'v2/pokemon/?limit=1118', headers);
    const jsonData = await response.json();
    return (jsonData);
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