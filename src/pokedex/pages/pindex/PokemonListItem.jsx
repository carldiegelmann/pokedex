import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {BagContext} from '../../context/BagContext';
import {capitalize} from '../../helper';

const PokemonListItem = ({pokemon}) => {

    const {addPokemon, bagItems, removePokemon} = useContext(BagContext);

    const isInBag = pokemon => {
        return !!bagItems.find(item => item.name === pokemon.name);
    }

    return pokemon ? (
        <div className="card">
            {isInBag(pokemon) && <div className="card-header">
                <div className="text-center">I own it!</div>
            </div>}
            <div className="card-body d-flex flex-column">
                {/* <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid" src={product.photo + '?v=' + product.id} alt=""/> */}
                <img src={pokemon.image} className="rounded mx-auto d-block" alt="" />
                <div className="card-body">
                    <h4 className="text-center"> # {pokemon.id} {capitalize(pokemon.name)}</h4>
                    {/* <ul className="list-group list-group-flush">
                    {pokemon.types.map(type =>
                        <li className="list-group-item">{type}</li>
                    )}
                </ul> */}
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
        </div>
    ) : null;
}

export default PokemonListItem;