import React from 'react';

const Characters = ({ characters }) => {
    return (
        <div className="characters-grid">
            {characters.map((character) => (
                <div key={character.id} className="character">
                    <img src={character.image} alt={character.name} />
                    <p>{character.name}</p>
                    <p>{character.status}</p>
                </div>
            ))}
        </div>
    );
};

export default Characters;
