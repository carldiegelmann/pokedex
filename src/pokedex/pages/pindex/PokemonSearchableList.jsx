import React, {useContext, useEffect, useMemo, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {useDebounce} from 'use-debounce';
import {trackPromise} from "react-promise-tracker";
import PokemonListItem from './PokemonListItem';
import {PokemonContext} from '../../context/PokemonContext';
import {getPokemonsWithFetch, fetchAdditionalData} from './../../context/api';
import styles from './PokemonSearchableList.module.scss';

const PokemonSearchableList = () => {
    const {allItems, pokemonItems, searchList, loadInitialPokemonList, fetchMorePokemon, searchPokemonList} = useContext(PokemonContext);

    const [searchString, setSearchString] = useState("");
    const [bouncedSearchString] = useDebounce(searchString, 1000);
    const [more, setMore] = useState(true);

    useEffect(async () => {
        loadInitialPokemonList();
    }, [])

    useMemo(async () => {
        if (bouncedSearchString.length > 0) {
            const searchTerm = bouncedSearchString.toString().toLowerCase();
            const items = await getPokemonsWithFetch();
            const allItemsFiltered = items.filter((item) => {return item.name.toLowerCase().includes(searchTerm)});
            const itemsWithImages = await Promise.all(allItemsFiltered.map((obj) => trackPromise(fetchAdditionalData(obj.url)))).then((responses) => {
                return allItemsFiltered.map((currElement, index) => ({...currElement, image: responses[index].imageUrl, types: responses[index].types}));
            });
            searchPokemonList(itemsWithImages);
            setMore(false);
        } else {
            searchPokemonList([]);
            setMore(true);
        }

    }, [bouncedSearchString])

    const pokeItems = searchList.length > 0 ? searchList : pokemonItems;
    return pokeItems ? (
        <div className={styles.p__container}>
            <div className="row">
                <div className="col-sm-8">
                    <div className="py-3">
                        {allItems ? allItems.length : 0} Pokemons
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="text" name="" placeholder="Search product" className="form-control" id="" onChange={(e) =>
                            setSearchString(e.currentTarget.value)
                        } />
                    </div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={pokeItems.length}
                next={fetchMorePokemon}
                hasMore={more}
                loader={<h4>Loading...</h4>}
                style={styles}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>End of pokemon list</b>
                    </p>
                }
            >
                <div className={styles.pokemon__grid}>
                    {
                        (pokeItems != null && pokeItems.length > 0) ? pokeItems.map(pokemon => (
                            <PokemonListItem pokemon={pokemon} />
                        )) : null
                    }
                </div>
            </InfiniteScroll>

            <div className={styles.p__footer}>

            </div>
        </div>
    ) : null;
}

export default PokemonSearchableList;