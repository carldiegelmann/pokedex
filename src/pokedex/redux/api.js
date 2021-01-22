import {v4 as uuidv4} from 'uuid';
import {MAX_ITEMS} from '../config';

const BASE_API = 'https://pokeapi.co/api/';

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export const getPokemonsWithFetch = async () => {
    const response = await fetch(BASE_API + 'v2/pokemon/?limit=' + MAX_ITEMS, headers);
    const jsonData = await response.json();
    const data = jsonData.results;
    const dataWithId = data.map((currElement, index) => ({...currElement, id: index + 1, key: uuidv4()}));
    return (dataWithId);
};

export const getPokemonDataWithUrl = async (url) => {
    const response = await fetch(url, headers);
    const jsonData = await response.json();
    return (jsonData);
};

export const getPokemonDescriptionWithId = async (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_API}v2/pokemon-species/${id}/`, headers)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    });
};

const giveDescription = (array) => {
    if (!array) return "";
    const en_description = array.find(element => element.language.name === "en");
    return en_description.flavor_text.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ') ?? "";
}

export const fetchAdditionalData = async (url, id) => {
    try {
        let [response, response2] = await Promise.all([await getPokemonDataWithUrl(url), await getPokemonDescriptionWithId(id)]);

        return {
            imageUrl: response.sprites.front_default,
            types: response.types.map((type) => type.type.name),
            stats: response.stats,
            moves: response.moves,
            desc: giveDescription(response2.flavor_text_entries)
        };
    } catch (err) {
        console.error('err', err);
    }
}