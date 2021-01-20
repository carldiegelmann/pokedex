
import React, {useContext} from 'react';
import {TrashIcon} from '../../components/icons'
import {CartContext} from '../../context/CartContext';
import {capitalize} from '../../helper'
import customConfirmAlert from '../../components/CustomConfirmAlert'

const CartItem = ({product}) => {

    const {removePokemon} = useContext(CartContext);

    return (
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2 vertical-center">
                <img
                    alt={product.name}
                    // style={{margin: "0 auto", maxHeight: "50px"}}
                    src={product.image.imageUrl} className="img-fluid d-block" />
            </div>
            <div className="col-sm-4 p-2 vertical-center">
                <h5 className="mb-1">#{product.id} - {capitalize(product.name)}</h5>
            </div>
            <div className="col-sm-4 p-2 text-right vertical-center">
                {
                    product &&
                    <button
                        onClick={() => customConfirmAlert(() => removePokemon(product))}
                        // onClick={() => removePokemon(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"} />
                    </button>
                }
            </div>
        </div>
    );
}

export default CartItem;