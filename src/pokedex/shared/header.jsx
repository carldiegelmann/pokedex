import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {BagContext} from '../context/BagContext';
import {BackPackIcon, HomeIcon} from '../components/icons';
import styles from './header.module.scss';

const Header = () => {
    const {itemCount} = useContext(BagContext);

    return (
        <header className={styles.header}>

            {/* <Link to='/'>Store</Link> */}
            <Link to='/'> <HomeIcon />Home</Link>
            <Link to='/bag'> <BackPackIcon />My Pokemon ({itemCount})</Link>
            {/* <Link to='/about'>About</Link> */}
        </header>
    );
}

export default Header;