
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {TrashIcon} from '../../components/icons'
import {CartContext} from '../../context/CartContext';
import {capitalize} from '../../helper'
import customConfirmAlert from '../../components/CustomConfirmAlert'

const CartItem = ({pokemon}) => {

    const {removePokemon} = useContext(CartContext);

    return (
        <div className="row no-gutters py-2 d-flex align-items-center">
            <div className="col-sm-2 p-2">
                <img
                    alt={pokemon.name}
                    src={pokemon.image} className="img-fluid d-block" />
            </div>
            <div className="col-sm-2 p-2">
                <h5 className="mb-1">#{pokemon.id} - {capitalize(pokemon.name)}</h5>
            </div>
            <div className="col-sm-2 p-2">
                <Link to={{
                    pathname: "/details/" + pokemon.id,
                    pokemon
                }} className="btn btn-link btn-sm mr-2" >Details</Link>
            </div>
            <div className="col-sm-4 p-2 text-right">
                {
                    pokemon &&
                    <button
                        onClick={() => customConfirmAlert(() => removePokemon(pokemon))}
                        className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"} />
                    </button>
                }
            </div>
        </div>
    );
}

export default CartItem;