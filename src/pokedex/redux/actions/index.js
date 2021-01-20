const BASE_API = 'https://pokeapi.co/api/';

export function fetchPokemons() {
    return dispatch => {
        dispatch(fetchProductsBegin());
        return fetch({BASE_API} + "v2/pokemon/")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchProductsSuccess(json.products));
                return json.products;
            })
            .catch(error => dispatch(fetchProductsFailure(error)));
    };
}

export const fetchProductsBegin = () => ({
    type: 'FETCH_PRODUCTS_BEGIN'
});

export const fetchProductsSuccess = pokemons => ({
    type: 'FETCH_PRODUCTS_SUCCESS',
    payload: {pokemons}
});

export const fetchProductsFailure = error => ({
    type: 'FETCH_PRODUCTS_FAILURE',
    payload: {error}
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const GET_CURRENT_USER = 'GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';
