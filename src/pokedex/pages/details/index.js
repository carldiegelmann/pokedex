import React, {useEffect, useState, useContext} from 'react';
import {withRouter, useParams} from 'react-router-dom';
import {trackPromise} from 'react-promise-tracker';
import ChartComponent from './ChartComponent';
import {CartContext} from '../../context/CartContext';
import {getPokemonDataWithUrl, getPokemonDescriptionWithId} from '../../context/api';
import {capitalize} from '../../helper';
import Layout from '../../components/Layout';
import styles from './index.module.scss';

const PokemonDetails = (props) => {
    const pokemon = props.location.pokemon;
    const {id} = useParams();
    const [state, setState] = useState({status: 'LOADING', data: []});
    const {addPokemon, removePokemon, cartItems} = useContext(CartContext);

    // const isInCart = pokemon => {
    //     return !!cartItems.find(item => item.name === pokemon.name);
    // }

    const margin = {top: 20, right: 20, bottom: 30, left: 40};

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

                    <h3 class="card-title"># {pokemon.id} {capitalize(pokemon.name)}</h3>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>

                    <img class="card-img-top" src={pokemon.image} className="rounded mx-auto d-block" alt="no image" />

                    <h5>Moves</h5>

                    <h5>Strength</h5>
                    <div className={styles.stats}>
                        <ChartComponent stats={pokemon.stats} />
                    </div>
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