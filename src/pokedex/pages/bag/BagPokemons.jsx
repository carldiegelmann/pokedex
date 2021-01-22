import React, {useContext} from 'react';
import {BagContext} from '../../context/BagContext';

import BagItem from './BagItem';
import styles from './BagPokemons.module.scss';

const BagPokemons = () => {

    const {bagItems} = useContext(BagContext);

    return (
        <div className={styles.p__container}>
            <div className="card card-body border-0">
                {
                    bagItems.map(pokemon => <BagItem key={pokemon.id} pokemon={pokemon} />)
                }
            </div>
        </div>

    );
}

export default BagPokemons;