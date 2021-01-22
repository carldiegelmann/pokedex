import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={`${styles.footer}  mt-5 p-3`}>
            MyPokemon 2021
        </footer>
    );
}

export default Footer;