import React, {useContext} from 'react';
import Layout from '../../components/Layout';

import CartProducts from './CartProducts';
import {CartContext} from '../../context/CartContext';


const Cart = () => {

    const {cartItems, itemCount, clearCart, checkout, handleCheckout} = useContext(CartContext);

    return (
        <Layout title="Cart" description="This is the Cart page" >
            <div >
                <div className="text-center mt-5">
                    <h1>My Pokemon</h1>
                    <p>These are your Pokomons.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            cartItems.length > 0 ?
                                <CartProducts /> :
                                <div className="p-3 text-center text-muted">
                                    Your backpack is empty
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Pokemon(s)</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={clearCart}>CLEAR ALL</button>
                                </div>

                            </div>
                        </div>
                    }

                </div>
            </div>
        </Layout>
    );
}

export default Cart;
