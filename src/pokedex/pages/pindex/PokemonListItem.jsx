import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Transition} from 'react-transition-group';
import {BagContext} from '../../context/BagContext';
import {capitalize} from '../../helper';

const PokemonListItem = ({pokemon}) => {

    const {addPokemon, bagItems, removePokemon} = useContext(BagContext);

    const isInBag = pokemon => {
        return !!bagItems.find(item => item.name === pokemon.name);
    }

    const duration = 500;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: {opacity: 1},
        entered: {opacity: 1},
        exiting: {opacity: 0},
        exited: {opacity: 0},
    };

    return pokemon ? (
        <div className="card">

            <Transition in={isInBag(pokemon)} timeout={500}>

                {astate => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[astate]
                    }}>

                        <div className="card-header">
                            <div className="text-center">I own it!</div>
                        </div>

                    </div>
                )}
            </Transition>


            <div className="card-body d-flex flex-column">
                <img src={pokemon.image} className="rounded mx-auto d-block" alt="" />
                <div className="card-body">
                    <h4 className="text-center"> # {pokemon.id} {capitalize(pokemon.name)}</h4>
                </div>
                <div className="text-right align-self-end">
                    <Link to={{
                        pathname: "/details/" + pokemon.id,
                        pokemon
                    }} className="btn btn-link btn-sm mr-2" >Details</Link>

                    {
                        !isInBag(pokemon) &&
                        <button
                            onClick={() => addPokemon(pokemon)}
                            className="btn btn-outline-primary btn-sm">Add</button>
                    }

                    {
                        isInBag(pokemon) &&
                        <button
                            onClick={() => removePokemon(pokemon)}
                            className="btn btn-primary btn-sm">Remove</button>
                    }
                </div>
            </div>
        </div >
    ) : null;
}

export default PokemonListItem;