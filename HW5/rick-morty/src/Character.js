import React, {useState} from 'react';

const Characters = ({characters}) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const openModal = (character) => {
        setSelectedCharacter(character);
    };

    const closeModal = () => {
        setSelectedCharacter(null);
    };

    return (
        <div>
            <div className="characters-grid">
                {characters.map((character) => (
                    <div key={character.id} className="character">
                        <img
                            onClick={() => openModal(character)}
                            src={character.image}
                            alt={character.name}
                        />
                        <p>{character.name}</p>
                        <p>{character.status}</p>
                    </div>
                ))}
            </div>

            {selectedCharacter && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedCharacter.image} alt={selectedCharacter.name}/>
                        <p>{selectedCharacter.name}</p>
                        <p>{selectedCharacter.status}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Characters;
