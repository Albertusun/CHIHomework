import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Hero = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
            setCharacter(data);
        };
        fetchCharacter();
    }, [id]);

    return character ? (
        <div>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
        </div>
    ) : <p>Loading...</p>;
};

export default Hero;
