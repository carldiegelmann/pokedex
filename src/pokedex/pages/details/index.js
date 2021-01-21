import React, {useEffect, useState, useContext} from 'react';
import {withRouter, useParams} from 'react-router-dom';
import ChartComponent from './ChartComponent';
import {CartContext} from '../../context/CartContext';
import {capitalize} from '../../helper';
import Layout from '../../components/Layout';
import styles from './index.module.scss';

const PokemonDetails = (props) => {
    const pokemon = props.location.pokemon;
    const {addPokemon, cartItems, removePokemon} = useContext(CartContext);

    useEffect(() => {
        if (!pokemon) props.history.push('/');
    }, [])

    const handleBackClick = () => {
        props.history.push('/');
    }

    const isInCart = pokemon => {
        if (!pokemon) {
            props.history.push('/');
        } else {
            return !!cartItems.find(item => item.name === pokemon.name);
        }
    }

    return (pokemon ?
        <Layout title="Detail" description="This is the Detail page" >
            <div className="card">
                {isInCart(pokemon) && <div className="card-header">
                    <div className="text-center">I own it!</div>
                </div>}
                <img className="card-img-top" src={pokemon.image} className="rounded mx-auto d-block" alt="no image" />
                <div className="card-body d-flex flex-column">

                    <h3 className="card-title text-center"># {pokemon.id} {capitalize(pokemon.name)}</h3>
                    <h6 className="card-subtitle mb-2 text-muted text-center">{pokemon.desc}</h6>

                    <div className="mb-5">
                        <h5>Types</h5>
                        <div>
                            {pokemon.types.map((type, index) =>
                                <div key={index}><span className="badge badge-pill badge-success">{type}</span></div>
                            )}
                        </div>
                    </div>

                    <div className="mb-5">
                        <h5>Moves</h5>
                        <div className={styles.moves__grid}>

                            {pokemon.moves.map((move, index) =>
                                <div key={index}>{capitalize(move.move.name)}</div>
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
        </Layout> : null
    );
}

export default withRouter(PokemonDetails);