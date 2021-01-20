import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../../context/CartContext';
import {capitalize} from '../../helper';

const PokemonListItem = ({pokemon, index}) => {

    const {addPokemon, cartItems, removePokemon} = useContext(CartContext);

    const isInCart = pokemon => {
        return !!cartItems.find(item => item.name === pokemon.name);
    }

    return (
        <div className={"card card-body mt-2"}>
            <div class="card-block">
                <div class="row">
                    <div class="col-md-4">
                        <h3 class="card-title">
                            {<img style={{maxHeight: "200px"}} className="img-fluid" src={pokemon.image.imageUrl} alt="" />} # {index + 1} {capitalize(pokemon.name)}
                            {isInCart(pokemon) && <span class="badge badge-secondary">I own it!</span>}
                        </h3>
                    </div>
                    <div class="col-md-4">
                        <ul>
                            {pokemon.image.types.map(type =>
                                <li>{type}</li>
                            )}
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <div className="text-right">
                            <Link to={{
                                pathname: "/details/",
                                data: pokemon.url // your data array of objects
                            }} className="btn btn-link btn-sm mr-2" >Details</Link>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonListItem;