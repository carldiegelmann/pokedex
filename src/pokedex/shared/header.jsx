import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {usePromiseTracker} from "react-promise-tracker";
import {CartContext} from '../context/CartContext';
import {BackPackIcon, HomeIcon} from '../components/icons';
import styles from './header.module.scss';

const Header = () => {

    const {promiseInProgress} = usePromiseTracker();

    const {itemCount, clearCart} = useContext(CartContext);

    return (

        <header className={styles.header}>

            {/* <Link to='/'>Store</Link> */}
            <Link to='/'> <HomeIcon />Home</Link>
            <Link to='/cart'> <BackPackIcon />My Pokemon ({itemCount})</Link>
            {/* <Link to='/about'>About</Link> */}

            {promiseInProgress ? (<div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div>) : null}
        </header>
    );
}

export default Header;