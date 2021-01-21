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
    const {addPokemon, cartItems, removePokemon} = useContext(CartContext);

    const isInCart = pokemon => {
        return !!cartItems.find(item => item.name === pokemon.name);
    }

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
                {isInCart(pokemon) && <div class="card-header">
                    <div className="text-center">I own it!</div>
                </div>}
                <img className="card-img-top" src={pokemon.image} className="rounded mx-auto d-block" alt="no image" />
                <div className="card-body d-flex flex-column">

                    <h3 className="card-title text-center"># {pokemon.id} {capitalize(pokemon.name)}</h3>
                    <h6 class="card-subtitle mb-2 text-muted text-center">Card subtitle</h6>
                    <div className="mb-5">
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="mb-5">
                        <h5>Types</h5>
                        <div>
                            {pokemon.types.map(type =>
                                <span class="badge badge-pill badge-success">{type}</span>
                            )}
                        </div>
                    </div>

                    <div className="mb-5">
                        <h5>Moves</h5>
                        <div className={styles.moves__grid}>

                            {pokemon.moves.map(move =>
                                <div>{capitalize(move.move.name)}</div>
                            )}

                        </div>
                    </div>

                    <div className="mb-5">
                        <h5>Strength</h5>
                        <div className={styles.stats}>
                            <ChartComponent stats={pokemon.stats} />
                        </div>
                    </div>
                    <div className="text-right align-self-end">
                        {
                            !isInCart(pokemon) &&
                            <button
                                onClick={() => addPokemon(pokemon)}
                                className="btn btn-outline-primary btn-sm">Add</button>
                        }

                        {
                            isInCart(pokemon) &&
                            <button
                                onClick={() => removePokemon(pokemon)}
                                className="btn btn-primary btn-sm">Remove</button>
                        }
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