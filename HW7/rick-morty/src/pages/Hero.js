import React from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchCharacterById } from '../api/requests';

const Hero = () => {
    const { id } = useParams();
    const { data: character, loading, error } = useRequest(() => fetchCharacterById(id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return character ? (
        <div>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
        </div>
    ) : null;
};

export default Hero;
