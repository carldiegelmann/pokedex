import React from 'react';
import Layout from '../../components/Layout';
//import PokemonList from './PokemonList';
import PokedexList from './PokedexList';

const PokemonIndex = () => {

    return (
        <Layout title="Store" description="This is the Store page" >
            <div >
                <div className="text-center mt-5">
                    <h1>Pokemon Index</h1>
                    <p>Search and add your favorite Pokemons to your own Pokemon list.</p>
                </div>
                <PokedexList />
            </div>
        </Layout>
    );
}

export default PokemonIndex;