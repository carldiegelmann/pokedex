import React, {useContext, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonListItem from './PokemonListItem';
import {getPokemonDataWithUrl} from './../../context/api'
import {PokemonContext} from '../../context/PokemonContext';
import {List, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import styles from './PokemonList.module.scss';

const PokemonList = () => {
    const context = useContext(PokemonContext);
    const [searchString, setSearchString] = useState("");
    const [viewMode, setViewMode] = useState({checked: false});
    const [images, setImages] = useState();

    const listHeight = 600;
    const rowHeight = 96;
    const rowWidth = 800;

    const data = useMemo(() => {
        const searchTerm = searchString.toString().toLowerCase();
        return searchTerm
            ? context.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm)
            )
            : context;
    }, [context, searchString]);

    const fetchImage = async (url) => {
        try {
            const response = await getPokemonDataWithUrl(url);
            return response.sprites.front_default;
        } catch (err) {
            console.error('err', err);
        }

    }

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    })

    const renderRow = ({index, key, style, parent}) => {
        const imageNr = data[index].url.split('/pokemon/')[1].replace('/', '');
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
                        <h2>{data[index].name}</h2>
                    </div>
                    <Link to={{
                        pathname: "/details/",
                        data: data[index].url // your data array of objects
                    }} className="btn btn-link btn-sm mr-2" >Details</Link>
                </div>
            </CellMeasurer>
        );
    }

    // const fetchImage = useMemo(async (url) => {
    //     try {
    //         const response = await getPokemonDataWithUrl(url);
    //         return response.sprites.front_default;
    //     } catch (err) {
    //         console.error('err', err);
    //     }
    // }, []);

    const fetchMoreData = async (url2) => {
        try {
            const response = await getPokemonDataWithUrl(url2);
            return response.sprites.front_default;
        } catch (err) {
            console.error('err', err);
        }
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

    console.log(context);
    return (
        <div className={styles.p__container}>
            <div className={styles.row}>
                <div className="col-sm-8">
                    <div className="py-3">
                        {data ? data.length : 0} Pokemons
                        <div className="form-group">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" checked={viewMode.checked} onChange={handleChange} />
                            <label class="form-check-label" for="exampleCheck1">List View</label>
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
                    {(data != null) ? <List
                        width={rowWidth}
                        height={listHeight}
                        rowHeight={rowHeight}
                        rowRenderer={renderRow}
                        rowCount={data.length} /> : null}
                </div>) :

                (data != null) ? (<InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {data.map((item, index) => (
                        <div style={style} key={index}>
                            <img className={styles.image} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} /> #{index} {item.name}
                        </div>
                    ))}
                </InfiniteScroll>) : null
                // (data != null) ? data.map(pokemon => (
                //     <div className={styles.p__grid}>
                //         <PokemonListItem key={pokemon.name} pokemon={pokemon} />
                //     </div>
                // )) : null
            }


            <div className={styles.p__footer}>

            </div>
        </div>
    );
}

export default PokemonList;