import React, { useState, useEffect } from "react";
import mockData from "./mockData";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUpperCase } from './constants';
import axios from 'axios';

const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(()=> {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(response => {
                const {data} = response;
                setPokemon(data);
        })
        .catch(err => setPokemon(false));
    },[pokemonId]);


    const generatePokemonJSX = () => {
        const {name, id, species, height, weight, types, sprites} = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_shiny } = sprites;
        return (
            <>
                <Typography variant="h1">
                    {`${id}.`} {toFirstCharUpperCase(name)}
                    <img src={front_shiny} />
                </Typography>
                <img style={{width: '300px', height: '300px'}} src={fullImageUrl} />
                <Typography variant='h2'>Pokemon Info</Typography>
                <Typography>
                    {'Species: '} <Link href={species.url}>{species.name}</Link>
                    <Typography>Height: {height}</Typography>
                    <Typography>Weight: {weight}</Typography>
                    <Typography variant='h6'>Types: </Typography>
                        {types.map(typeInfo => {
                            const {type} = typeInfo;
                            const {name} = type;
                            return <Typography key={name}> {`${name}`}</Typography>
                        })}
                </Typography>
            </>
        )
    };

    return (
        // 1. pokemon = undefined, so return loading progress
        // 2. pokemon = good data, so return actual info
        // 3. pokemon = bad data / false, so return pokemon not found
        <>
        {pokemon === undefined && <CircularProgress/>}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography>Pokemon not found</Typography>}
        {pokemon !== undefined && (
            <Button variant='contained' onClick={()=> history.push('/')}>
                Back to pokedex
            </Button>
        )}
        </>
    );
};

export default Pokemon;