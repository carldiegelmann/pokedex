import React, {useEffect, useState} from 'react';
import {connect} from "react-redux"
import * as actionCreators from "./../../redux/actionCreators"
import {useDebounce} from 'use-debounce';
import PokemonListItem from './PokemonListItem';
import styles from './PokemonSearchableList.module.scss';

const PokemonSearchableList = ({pokemonItems, searchList, loading, fetchPokemon, searchPokemonList}) => {
    const [searchString, setSearchString] = useState("");
    const [bouncedSearchString] = useDebounce(searchString, 1000);

    const handleSearchChange = event => {
        setSearchString(event.target.value);
    };

    useEffect(() => {
        const searchTerm = bouncedSearchString.toString().toLowerCase();
        searchPokemonList(searchTerm);
    }, [searchPokemonList, bouncedSearchString]);

    // useMemo(async () => {
    //     const searchTerm = bouncedSearchString.toString().toLowerCase();
    //     searchPokemonList(searchTerm);
    // }, [pokemonItems, bouncedSearchString])

    useEffect(() => {
        fetchPokemon(pokemonItems.length);
    }, []);

    function renderButton() {
        return loading || pokeItems.length === 0 ? (<div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>) : (!(searchList.length > 0) ? <button
            onClick={() => fetchPokemon(pokeItems.length)}
            className="btn btn-outline-primary btn-sm">Load more...</button> : null);
    }

    const pokeItems = searchList.length > 0 ? searchList : pokemonItems;
    return pokeItems ? (
        <div className={styles.p__container}>
            <div className="row">
                <div className="col-sm-8">
                    <div className="py-3">
                        {pokeItems ? pokeItems.length : 0} Pokemons
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="text" name="" placeholder="Search product" className="form-control" id="" onChange={(e) =>
                            handleSearchChange(e)
                        } />
                    </div>
                </div>
            </div>

            <div className={styles.pokemon__grid}>
                {
                    (pokeItems != null && pokeItems.length > 0) ? pokeItems.map(pokemon => (
                        <PokemonListItem pokemon={pokemon} key={pokemon.key} />
                    )) : null
                }
            </div>

            <div className="row">
                <div className="col text-center mt-2">
                    {renderButton()}
                </div>
            </div>
            <div className={styles.p__footer}>

            </div>
        </div>
    ) : null;
}

const mapState = (state) => {
    return {
        pokemonItems: state.pokedex.pokemonItems,
        searchList: state.pokedex.searchList,
        loading: state.pokedex.loading
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPokemon: (cursor) => dispatch(actionCreators.fetchPokemon(cursor)),
    searchPokemonList: (items) => dispatch(actionCreators.searchPokemonList(items))
});

export default connect(
    mapState,
    mapDispatchToProps
)(PokemonSearchableList)
