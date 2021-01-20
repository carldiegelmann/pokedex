import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import {trackPromise} from "react-promise-tracker";
import PokemonListItem from './PokemonListItem';
import {useDebounce} from 'use-debounce';
import {getPokemonDataWithUrl, getPokemonsWithFetch} from './../../context/api'
import {PokemonContext} from '../../context/PokemonContext';
import {List, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import styles from './PokemonList.module.scss';

const PokedexList = () => {
    //const context = useContext(PokemonContext);
    const [state, setState] = useState({status: 'LOADING', items: [], fullyloadedItems: [], marker: 0});
    const [data, setData] = useState();
    const [searchString, setSearchString] = useState("");
    const [bouncedSearchString] = useDebounce(searchString, 1000);
    const [viewMode, setViewMode] = useState({checked: false});
    //const [images, setImages] = useState();
    const [loading, setLoading] = useState(true);

    const listHeight = 600;
    const rowHeight = 96;
    const rowWidth = 800;

    const fetchImage = async (url) => {

        try {
            const response = await getPokemonDataWithUrl(url);
            return {imageUrl: response.sprites.front_default, types: response.types.map((type) => type.type.name)};
        } catch (err) {
            console.error('err', err);
        }
    }

    useMemo(async () => {
        if (searchString.length === 0 && state.fullyloadedItems && state.fullyloadedItems.length === 0) return;
        if (searchString.length !== 0 && state.fullyloadedItems) {
            const searchTerm = searchString.toString().toLowerCase();

            const filterMe = state.fullyloadedItems;

            const listFiltred = searchTerm ? filterMe.filter(
                (item) => {
                    return item.name.toLowerCase().includes(searchTerm)
                }
            ) : filterMe;

            console.log("Filtered:" + listFiltred);

            // const foo2 = await Promise.all(foo.map((obj) => fetchImage(obj.url))).then((responses) => {
            //     console.log(responses.length);
            //     const array = foo.map((currElement, index) => ({...currElement, image: responses[index]}));
            //     return array;
            // });

            // differ search result
            const completeListFiltered = state.items.filter(
                (item) => {
                    return item.name.toLowerCase().includes(searchTerm)
                });
            if (listFiltred.length !== completeListFiltered.length) {
                console.log("SEARCH DIFFER!!" + completeListFiltered.length + " - " + listFiltred.length)
                const foo2 = await Promise.all(completeListFiltered.map((obj) => trackPromise(fetchImage(obj.url)))).then((responses) => {
                    console.log(responses.length);
                    const array = completeListFiltered.map((currElement, index) => ({...currElement, image: responses[index]}));
                    return array;
                });
                setData(foo2);
                setLoading(false);
            } else {
                setData(listFiltred);
                setLoading(false);
            }
        } else {
            setData(state.fullyloadedItems);
            setLoading(true);
        }
    }, [state.fullyloadedItems, bouncedSearchString]); // only render when search string changes 

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    })

    useEffect(async () => {
        console.log('load pokemons')
        setState({status: 'LOADING '});
        trackPromise(fetch());
    }, [])

    const initialSize = 2;

    const fetch = async () => {
        try {
            const result = await getPokemonsWithFetch();
            if (result.results) {
                const foo = result.results.slice(0, initialSize);
                const foo2 = await Promise.all(foo.map((obj) => fetchImage(obj.url))).then((responses) => {
                    console.log(responses.length);
                    const array = foo.map((currElement, index) => ({...currElement, image: responses[index], id: index + 1}));
                    return array;
                });
                setState({
                    status: 'LOADED',
                    items: result.results,
                    fullyloadedItems: foo2,
                    marker: initialSize
                });
                setData(foo2);
            } else {
                setState({status: 'ERROR'});
            }
        } catch (err) {
            console.error('err', err);
        }
        console.log(state.fullyloadedItems);
    }

    const renderRow = ({index, key, style, parent}) => {
        const imageNr = state.items[index].url.split('/pokemon/')[1].replace('/', '');
        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div style={style} className="row">
                    <div className="image">
                        <img className={styles.image} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageNr}.png`} />
                    </div>
                    <div>
                        <div>#{imageNr}</div>
                    </div>
                    <div className={styles.content}>
                        <h2>{state.items[index].name}</h2>
                    </div>
                    <Link to={{
                        pathname: "/details/",
                        items: state.items[index].url // your data array of objects
                    }} className="btn btn-link btn-sm mr-2" >Details</Link>
                </div>
            </CellMeasurer>
        );
    }

    const fetchMoreData = async () => {

        const foo = state.items.slice(state.marker, state.marker + initialSize)
        const foo2 = await Promise.all(foo.map((obj) => fetchImage(obj.url))).then((responses) => {
            console.log(responses.length);
            const array = foo.map((currElement, index) => ({...currElement, image: responses[index]}));
            return array;
        });

        setState({
            ...state,
            fullyloadedItems: state.fullyloadedItems.concat(foo2),
            marker: state.marker + initialSize
        });
        setData(data.concat(foo2))
    };

    const handleChange = (event) => {
        console.log(viewMode);
        setViewMode({checked: event.target.checked})
    }

    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8
    };

    return (
        <div className={styles.p__container}>
            <div className={styles.row}>
                <div className="col-sm-8">
                    <div className="py-3">
                        {data ? data.length : 0} / {state.items ? state.items.length : 0} Pokemons
                        <div className="form-group">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" checked={viewMode.checked} onChange={handleChange} />
                            <label className="form-check-label" for="exampleCheck1">List View</label>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="text" name="" placeholder="Search Pokemon" className="form-control" id="" onChange={(e) =>
                            setSearchString(e.currentTarget.value)
                        } />
                    </div>
                </div>
            </div>

            {viewMode.checked ? (
                <div className="list">
                    {(state.items != null) ? <List
                        width={rowWidth}
                        height={listHeight}
                        rowHeight={rowHeight}
                        rowRenderer={renderRow}
                        rowCount={state.items.length} /> : null}
                </div>) :

                ((data != null) ? (
                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchMoreData}
                        hasMore={loading}
                        loader={<h4>Loading...</h4>}
                        style={styles}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>End of pokemon list</b>
                            </p>
                        }
                    >
                        {data.map((pokemon, index) => (
                            <PokemonListItem pokemon={pokemon} index={index} />
                        ))}
                    </InfiniteScroll>) : null)
            }
            <div className={styles.p__footer}>

            </div>
        </div >
    );
}

export default PokedexList;