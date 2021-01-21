import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {trackPromise} from 'react-promise-tracker';
import {getPokemonDataWithUrl, getPokemonDescriptionWithId} from '../../context/api';
import Layout from '../../components/Layout';

const PokemonDetails = (props) => {
    const data = props.location;
    const [state, setState] = useState({status: 'LOADING', data: [], data2: []});
    console.log(data);
    // const [state, setState] = useState({status: 'LOADING', data: []});
    // useEffect(async () => {
    //     const result = await getPokemonsWithFetch();
    // });

    const handleBackClick = () => {
        props.history.push('/');
    }

    useEffect(async () => {
        if (!data.data) {
            props.history.push('/');
        }

        async function fetchMyAPI() {
            try {
                const response = await getPokemonDataWithUrl(data.data);
                const response2 = await getPokemonDescriptionWithId(response.id);
                console.log(response);
                setState({status: 'LOADED', data: response, data2: response2})
            } catch (err) {
                console.error('err', err);
            }
        }

        trackPromise(
            fetchMyAPI()
        )
    }, [])

    const giveDescription = (array) => {
        if (!array) return "";
        const en_description = array.find(element => element.language.name === "en");
        return en_description.flavor_text ?? "";
    }

    return (
        <Layout title="Detail" description="This is the Detail page" >
            <div className="card card-body">
                <h3>Number: {state.data.id} Name: {state.data.name}</h3>
                {state.data.sprites ? (<img className="rounded mx-auto d-block" src={state.data.sprites.front_default} />) : null}
                <p>{giveDescription(state.data2.flavor_text_entries)}</p>
                <div className="text-right">
                    <button
                        onClick={() => handleBackClick()}
                        className="btn btn-outline-primary btn-sm">Back to list</button>
                </div>
            </div>
            {/* <div className="card card-body">

                <div class="view zoom overlay z-depth-2 rounded">
                    <img className="img-fluid w-100"
                        src={state.sprites.front_default} alt="Sample" />

                    <div className="mask">
                        <img className="img-fluid w-100"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" />
                        <div className="mask rgba-black-slight"></div>
                    </div>

                </div>

                <div className="pt-4">

                    <h5>Fantasy T-shirt</h5>
                    <h6>12.99 $</h6>
                </div>
            </div> */}

        </Layout>
    );
}

export default withRouter(PokemonDetails);