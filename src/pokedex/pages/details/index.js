import React, {useEffect, useState, useContext} from 'react';
import {withRouter, useParams} from 'react-router-dom';
import {trackPromise} from 'react-promise-tracker';
import {CartContext} from '../../context/CartContext';
import {getPokemonDataWithUrl, getPokemonDescriptionWithId} from '../../context/api';
import {capitalize} from '../../helper';
import Layout from '../../components/Layout';

const PokemonDetails = (props) => {
    const pokemon = props.location.pokemon;
    const {id} = useParams();
    const [state, setState] = useState({status: 'LOADING', data: []});
    const {addPokemon, removePokemon, cartItems} = useContext(CartContext);

    // const isInCart = pokemon => {
    //     return !!cartItems.find(item => item.name === pokemon.name);
    // }

    console.log(pokemon);
    //console.log(data);
    // const [state, setState] = useState({status: 'LOADING', data: []});
    // useEffect(async () => {
    //     const result = await getPokemonsWithFetch();
    // });

    const handleBackClick = () => {
        props.history.push('/');
    }

    useEffect(async () => {
        if (!pokemon) {
            props.history.push('/');
        }

        async function fetchMyAPI() {
            try {
                const response = await getPokemonDescriptionWithId(id);
                console.log(response);
                setState({status: 'LOADED', data: response})
            } catch (err) {
                console.error('err', err);
            }
        }

        trackPromise(
            fetchMyAPI()
        )
    }, [])

    const giveDescription = (array) => {
        if (!array) return "";
        const en_description = array.find(element => element.language.name === "en");
        return en_description.flavor_text ?? "";
    }

    return (
        <Layout title="Detail" description="This is the Detail page" >
            <div className="card">
                <div class="card-body">
                    <img class="card-img-top" src={pokemon.image} className="rounded mx-auto d-block" alt="no image" />
                    <h5 class="card-title"># {pokemon.id} {capitalize(pokemon.name)}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <h3></h3>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    {/* {state.data.sprites ? (<img className="rounded mx-auto d-block" src={state.data.sprites.front_default} />) : null} */}
                    {/* <p>{giveDescription(state.data.flavor_text_entries)}</p> */}
                    <div className="text-right">
                        <button
                            onClick={() => handleBackClick()}
                            className="btn btn-outline-primary btn-sm">Back to list</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default withRouter(PokemonDetails);